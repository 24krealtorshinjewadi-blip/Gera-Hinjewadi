export interface WhatsAppLeadDetails {
  project: string;
  name: string;
  phone: string;
  email?: string;
  budget: string;
  configuration: string;
}

export async function sendWhatsAppNotification(details: WhatsAppLeadDetails) {
  const messageBody = `New Property Enquiry

Project: ${details.project}
Name: ${details.name}
Phone: ${details.phone}
Email: ${details.email || 'N/A'}
Budget: ${details.budget}
Configuration: ${details.configuration}

Submitted Successfully.`;

  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // default Twilio sandbox number
  const toWhatsApp = process.env.SALES_WHATSAPP_TO || '+919673000053';

  // Format to standard WhatsApp format required by Twilio (whatsapp:+[number])
  const formattedTo = toWhatsApp.startsWith('whatsapp:') ? toWhatsApp : `whatsapp:${toWhatsApp}`;
  const formattedFrom = fromWhatsApp.startsWith('whatsapp:') ? fromWhatsApp : `whatsapp:${fromWhatsApp}`;

  console.log('--- WHATSAPP NOTIFICATION TRIGGERED ---');
  console.log(messageBody);
  console.log('---------------------------------------');

  if (!twilioSid || !twilioToken) {
    console.log(
      'INFO: Live WhatsApp dispatch skipped. Configure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env.local to send live WhatsApp notifications.'
    );
    return { success: true, mocked: true, message: 'Logged notification successfully.' };
  }

  try {
    const authString = Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
    
    const params = new URLSearchParams();
    params.append('To', formattedTo);
    params.append('From', formattedFrom);
    params.append('Body', messageBody);

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authString}`,
        },
        body: params.toString(),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Twilio WhatsApp dispatch error response:', result);
      return { success: false, error: result.message || 'Failed to dispatch via Twilio' };
    }

    console.log(`WhatsApp notification successfully sent to ${toWhatsApp}. Twilio Message SID: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('Failed to dispatch WhatsApp notification via Twilio:', error);
    const errMsg = error instanceof Error ? error.message : 'An unexpected fetch error occurred';
    return { success: false, error: errMsg };
  }
}
