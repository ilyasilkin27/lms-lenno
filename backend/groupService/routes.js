import express from 'express';
import groupController from './controllers/groupController.js';

const router = express.Router();

router.post('/api/groups', async (req, res) => {
  const { name, classes } = req.body;

  try {
    const newGroup = await groupController.createGroup(name, classes);
    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get('/api/groups', async (req, res) => {
  try {
    const groups = await groupController.getAllGroups();
    return res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/api/groups/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const group = await groupController.getGroupById(id);
    return res.json(group);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

router.put('/api/groups/:id', async (req, res) => {
  const { id } = req.params;
  const { name, classes } = req.body;

  try {
    const updatedGroup = await groupController.updateGroup(id, name, classes);
    return res.json(updatedGroup);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete('/api/groups/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await groupController.deleteGroup(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export default router; 