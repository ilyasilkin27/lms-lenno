import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const calendar = google.calendar({ version: 'v3' });

const createEvent = async (eventDetails) => {
  try {
    const credentials = {
      type: 'service_account',
      project_id: 'eternal-grove-451510-m3',
      private_key_id: '57ebda08e28fcf92b2216e1982f9b02247e9ad21',
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: '118096135279409856945',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
      universe_domain: 'googleapis.com'
    };

    console.log('Service Account Email:', credentials.client_email);
    console.log('Creating event with details:', eventDetails);

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing Google credentials in environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Get calendar details
    const calendarDetails = await calendar.calendars.get({
      calendarId: 'primary'
    });
    console.log('Calendar Details:', calendarDetails.data);

    const formattedAttendees = eventDetails.attendees?.map(attendee => ({
      email: attendee.email,
      responseStatus: 'needsAction'
    })) || [];

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
      attendees: formattedAttendees,
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
      sendUpdates: 'all',
    });

    console.log('Event created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error(`Failed to create calendar event: ${error.message}`);
  }
};

const getEvents = async () => {
  try {
    const credentials = {
      type: 'service_account',
      project_id: 'eternal-grove-451510-m3',
      private_key_id: '57ebda08e28fcf92b2216e1982f9b02247e9ad21',
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: '118096135279409856945',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
      universe_domain: 'googleapis.com'
    };

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing Google credentials in environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    throw new Error(`Failed to fetch calendar events: ${error.message}`);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const credentials = {
      type: 'service_account',
      project_id: 'eternal-grove-451510-m3',
      private_key_id: '57ebda08e28fcf92b2216e1982f9b02247e9ad21',
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: '118096135279409856945',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
      universe_domain: 'googleapis.com'
    };

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing Google credentials in environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ]
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
      sendUpdates: 'all'
    });

    return { message: 'Event deleted successfully' };
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    throw new Error(`Failed to delete calendar event: ${error.message}`);
  }
};

export { createEvent, getEvents, deleteEvent }; 