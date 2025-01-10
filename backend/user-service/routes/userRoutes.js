import express from 'express';
import { checkExistingUser, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/api/users/:login', async (req, res) => {
  const { login } = req.params;
  
  try {
    const user = await checkExistingUser(login);
    if (user) {
      return res.json(user);
    }
    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/api/users', async (req, res) => {
  const { name, surname, login, password, role } = req.body;

  try {
    const newUser = await createUser(name, surname, login, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
