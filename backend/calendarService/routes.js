import express from 'express';
import { createEvent, getEvents } from './controllers/googleCalendarController.js';

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

export default router; 