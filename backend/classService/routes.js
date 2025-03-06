import express from 'express';
import classController from './controllers/classController.js';

const router = express.Router();

router.post('/api/classes', async (req, res) => {
  const { name } = req.body;

  try {
    const newClass = await classController.createClass(name);
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get('/api/classes', async (req, res) => {
  try {
    const classes = await classController.getAllClasses();
    return res.json(classes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/api/classes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const classItem = await classController.getClassById(id);
    return res.json(classItem);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

router.put('/api/classes/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedClass = await classController.updateClass(id, name);
    return res.json(updatedClass);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/api/classes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await classController.deleteClass(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router; 