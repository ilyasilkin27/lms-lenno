import { google } from 'googleapis';
import dotenv from 'dotenv';
import supabase from '../db/supabase.js';

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

    console.log('Using credentials for:', credentials.client_email);

    if (!credentials.client_email || !credentials.private_key) {
      throw new Error('Missing Google credentials in environment variables');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

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

    const { data: savedEvent, error: saveError } = await supabase
      .from('calendar_events')
      .insert([
        {
          google_event_id: response.data.id,
          summary: eventDetails.summary,
          location: eventDetails.location,
          description: eventDetails.description,
          start_date_time: eventDetails.startDateTime,
          end_date_time: eventDetails.endDateTime,
          attendees: formattedAttendees,
          created_by: eventDetails.userId || null
        }
      ])
      .select()
      .single();

    if (saveError) {
      console.error('Error saving event to Supabase:', saveError);
      throw new Error('Failed to save event to database');
    }

    return savedEvent;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw new Error(`Failed to create calendar event: ${error.message}`);
  }
};

const getEvents = async (userId) => {
  try {
    const { data: events, error } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('created_by', userId)
      .order('start_date_time', { ascending: true });

    if (error) {
      console.error('Error fetching events from Supabase:', error);
      throw new Error('Failed to fetch events from database');
    }

    return events;
  } catch (error) {
    console.error('Error getting events:', error);
    throw new Error(`Failed to get events: ${error.message}`);
  }
};

export { createEvent, getEvents }; 