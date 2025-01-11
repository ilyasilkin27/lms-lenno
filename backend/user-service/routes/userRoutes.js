import express from 'express';
import { checkExistingUser, createUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/api/users/login', async (req, res) => {
  const { login, password } = req.body;
  
  try {
    const user = await checkExistingUser(login, password);
    
    return res.json(user);
  } catch (error) {
    return res.status(401).json({ message: error.message });
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
