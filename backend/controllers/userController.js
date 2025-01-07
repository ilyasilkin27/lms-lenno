import asyncHandler from 'express-async-handler';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (req, res) => {
  const { name, login, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM public.users WHERE login = $1',
    [login]
  );

  if (result.rows && result.rows.length > 0) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const role = 'teacher';

  const newUser = await pool
    .query(
      'INSERT INTO users (name, login, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, login, hashedPassword, role]
    )
    .catch((err) => {
      console.error('Error inserting user:', err.stack);
      throw new Error('Failed to insert user');
    });

  const user = newUser.rows[0];

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      login: user.login,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE login = $1', [
    login,
  ]);
  const user = result.rows[0];

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      login: user.login,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid login or password');
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export { registerUser, loginUser };
