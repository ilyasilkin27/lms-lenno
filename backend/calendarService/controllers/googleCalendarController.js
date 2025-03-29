import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const calendar = google.calendar({ version: 'v3' });

const createEvent = async (eventDetails) => {
  try {
    const possiblePaths = [
      path.join(process.cwd(), 'client_secret.json'),
      path.join(process.cwd(), 'calendarService', 'client_secret.json'),
      path.join(process.cwd(), '..', 'client_secret.json'),
    ];

    let credentialsPath = null;
    for (const path of possiblePaths) {
      if (fs.existsSync(path)) {
        credentialsPath = path;
        break;
      }
    }

    if (!credentialsPath) {
      throw new Error('Could not find client_secret.json in any of the expected locations');
    }

    console.log('Found credentials at:', credentialsPath);
    
    const credentials = JSON.parse(fs.readFileSync(credentialsPath));
    console.log('Credentials loaded:', {
      type: credentials.type,
      project_id: credentials.project_id,
      client_email: credentials.client_email,
      // Don't log private_key for security
    });

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Invalid credentials: missing client_email or private_key');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const event = {
      summary: eventDetails.summary,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startDateTime,
        timeZone: 'Europe/Moscow',
      },
      end: {
        dateTime: eventDetails.endDateTime,
        timeZone: 'Europe/Moscow',
      },
      attendees: eventDetails.attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error(`Failed to create calendar event: ${error.message}`);
  }
};

export { createEvent }; 