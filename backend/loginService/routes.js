import express from 'express';
import checkExistingUser from './utils/isUser.js';

const router = express.Router();

router.post('/api/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await checkExistingUser(login, password);

    return res.json(user);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default router;
