import { google } from 'googleapis';

const calendar = google.calendar({ version: 'v3' });

const createEvent = async (eventDetails) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'client_secret.json',
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
};

export { createEvent }; 