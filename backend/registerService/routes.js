import express from 'express';
import createUser from './utils/dbRegister.js';

const router = express.Router();

router.post('/api/register', async (req, res) => {
  const { name, surname, login, password, role } = req.body;

  try {
    const newUser = await createUser(name, surname, login, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
