import express from 'express';
import { createEvent, getEvents, deleteEvent } from './controllers/googleCalendarController.js';

const router = express.Router();

router.post('/api/calendar/events', async (req, res) => {
  const { summary, location, description, startDateTime, endDateTime, attendees } = req.body;

  try {
    const event = await createEvent({ summary, location, description, startDateTime, endDateTime, attendees });
    return res.status(201).json(event);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get('/api/calendar/events', async (req, res) => {
  try {
    const events = await getEvents();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/api/calendar/events/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    await deleteEvent(eventId);
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router; 