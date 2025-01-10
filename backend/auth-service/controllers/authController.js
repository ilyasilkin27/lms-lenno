import asyncHandler from 'express-async-handler';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const USER_SERVICE_URL = 'https://lms-lenno-user-service.onrender.com/api/users';

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, login, password } = req.body;

  const response = await axios.get(`${USER_SERVICE_URL}/${login}`);

  if (response.data) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUserResponse = await axios.post(`${USER_SERVICE_URL}`, {
    name,
    surname,
    login,
    password: hashedPassword,
  });

  const newUser = newUserResponse.data;

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      login: newUser.login,
      role: newUser.role,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;
  
  const response = await axios.get(`${USER_SERVICE_URL}/${login}`);
  
  const user = response.data;

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({
      _id: user.id,
      name: user.name,
      surname: user.surname,
      login: user.login,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid login or password');
  }
});

export { registerUser, loginUser };
