import asyncHandler from 'express-async-handler';
import supabase from '../config/supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const checkExistingUser = async (login) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('login', login)
    .maybeSingle();

  if (error) {
    console.error('Error checking user:', error);
    throw new Error('Failed to check if user exists');
  }

  return data;
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, login, password } = req.body;

  const existingUser = await checkExistingUser(login);
  
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const role = 'teacher';

  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert([
      { name, surname, login, password: hashedPassword, role }
    ])
    .select()
    .single();

  if (insertError) {
    console.error('Error inserting user:', insertError);
    res.status(500).json({ message: 'Failed to insert user', error: insertError });
    return;
  }

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      login: newUser.login,
      role: newUser.role,
      token: generateToken(newUser.id),
    });
  } else {
    console.error('Error: No user data returned');
    res.status(400).json({ message: 'Invalid user data', error: 'No data returned from insert' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('login', login)
    .single();

  if (error || !user) {
    res.status(401);
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (user && isMatch) {
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
