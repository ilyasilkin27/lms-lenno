import express from 'express';
import { createEvent } from './controllers/googleCalendarController.js';

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

export default router; 