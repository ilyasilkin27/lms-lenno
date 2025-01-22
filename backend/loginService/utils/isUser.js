import supabase from '../db/supabase.js';
import bcrypt from 'bcryptjs';

export default async (login, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('login', login)
    .maybeSingle();

  if (error) {
    console.error('Error checking user:', error);
    throw new Error('Не удалось проверить, существует ли пользователь');
  }

  if (!data) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  return data;
};