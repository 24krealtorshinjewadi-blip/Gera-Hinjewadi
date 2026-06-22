/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config({ path: '.env.local' });
global.WebSocket = require('ws');
const { createClient } = require('@supabase/supabase-js');
const { BigQuery } = require('@google-cloud/bigquery');

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Initialize BigQuery
// If GOOGLE_APPLICATION_CREDENTIALS is set in .env.local, Google SDK will use it automatically.
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT;
const datasetId = process.env.BIGQUERY_DATASET || 'gera_developments';
const tableId = process.env.BIGQUERY_TABLE || 'leads';

const bigquery = new BigQuery({
  projectId: projectId,
});

async function runSync() {
  console.log('Starting Supabase to BigQuery sync...');
  console.log(`GCP Project: ${projectId || 'Default (ADC)'}`);
  console.log(`BigQuery Target: ${datasetId}.${tableId}`);

  try {
    // 1. Fetch data from Supabase
    console.log('Fetching leads from Supabase...');
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*');

    if (error) {
      throw new Error(`Failed to fetch from Supabase: ${error.message}`);
    }

    console.log(`Fetched ${leads.length} leads from Supabase.`);

    if (leads.length === 0) {
      console.log('No leads to sync.');
      return;
    }

    // 2. Ensure Dataset and Table exist in BigQuery
    const dataset = bigquery.dataset(datasetId);
    
    // Ensure dataset exists
    const [datasetExists] = await dataset.exists();
    if (!datasetExists) {
      console.log(`Dataset ${datasetId} does not exist. Creating...`);
      await dataset.create();
      console.log(`Dataset ${datasetId} created.`);
    }

    const table = dataset.table(tableId);
    const [tableExists] = await table.exists();

    const schema = [
      { name: 'id', type: 'STRING', mode: 'REQUIRED' },
      { name: 'name', type: 'STRING', mode: 'REQUIRED' },
      { name: 'phone', type: 'STRING', mode: 'REQUIRED' },
      { name: 'email', type: 'STRING', mode: 'NULLABLE' },
      { name: 'budget', type: 'STRING', mode: 'REQUIRED' },
      { name: 'configuration', type: 'STRING', mode: 'REQUIRED' },
      { name: 'message', type: 'STRING', mode: 'NULLABLE' },
      { name: 'project', type: 'STRING', mode: 'NULLABLE' },
      { name: 'source', type: 'STRING', mode: 'NULLABLE' },
      { name: 'status', type: 'STRING', mode: 'NULLABLE' },
      { name: 'notes', type: 'STRING', mode: 'NULLABLE' },
      { name: 'site_visit_date', type: 'TIMESTAMP', mode: 'NULLABLE' },
      { name: 'assigned_agent_id', type: 'STRING', mode: 'NULLABLE' },
      { name: 'created_at', type: 'TIMESTAMP', mode: 'REQUIRED' }
    ];

    if (!tableExists) {
      console.log(`Table ${tableId} does not exist. Creating...`);
      await table.create({ schema });
      console.log(`Table ${tableId} created.`);
    }

    // 3. Map leads to BigQuery format
    const rows = leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      budget: lead.budget,
      configuration: lead.configuration,
      message: lead.message || null,
      project: lead.project || null,
      source: lead.source || null,
      status: lead.status || null,
      notes: lead.notes || null,
      site_visit_date: lead.site_visit_date ? new Date(lead.site_visit_date).toISOString() : null,
      assigned_agent_id: lead.assigned_agent_id || null,
      created_at: new Date(lead.created_at).toISOString()
    }));

    // 4. Load rows into BigQuery via a local NDJSON file (allowed in GCP Free Tier / Sandbox)
    console.log(`Uploading ${rows.length} rows to BigQuery (via Load Job)...`);
    const fs = require('fs');
    const path = require('path');
    const tempFilePath = path.join(__dirname, 'temp_leads.json');

    // Convert rows to Newline Delimited JSON (NDJSON)
    const ndjsonContent = rows.map(r => JSON.stringify(r)).join('\n');
    fs.writeFileSync(tempFilePath, ndjsonContent);

    try {
      const metadata = {
        sourceFormat: 'NEWLINE_DELIMITED_JSON',
        schema: { fields: schema },
        writeDisposition: 'WRITE_TRUNCATE', // Automatically truncates the table first in a single transaction!
      };

      const res = await table.load(tempFilePath, metadata);
      const job = res[0];
      
      if (job) {
        if (typeof job.promise === 'function') {
          await job.promise();
        } else if (typeof job.on === 'function') {
          await new Promise((resolve, reject) => {
            job.on('error', reject).on('complete', () => resolve(true));
          });
        } else if (typeof job.getMetadata === 'function') {
          let done = false;
          while (!done) {
            const [jobMetadata] = await job.getMetadata();
            if (jobMetadata.status?.state === 'DONE') {
              done = true;
              if (jobMetadata.status?.errorResult) {
                throw new Error(jobMetadata.status.errorResult.message);
              }
            } else {
              await new Promise(r => setTimeout(r, 1000));
            }
          }
        }
      }
      console.log('Sync completed successfully!');
    } finally {
      // Clean up temporary file
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

runSync();
