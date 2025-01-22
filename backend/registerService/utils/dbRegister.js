import supabase from '../db/supabase.js';
import bcrypt from 'bcryptjs';

const validateInput = (name, surname, password) => {
  const namePattern = /^[a-zA-Zа-яА-я\-]{3,30}$/;
  const surnamePattern = /^[a-zA-Zа-яА-я\-]{3,30}$/;
  const passwordPattern = /^[^\s]{8,}$/;

  if (!namePattern.test(name)) {
    throw new Error('Имя должно содержать от 3 до 30 символов, допускать только буквы и "-", и не содержать пробелов.');
  }

  if (!surnamePattern.test(surname)) {
    throw new Error('Фамилия должна содержать от 3 до 30 символов, допускать только буквы и "-", и не содержать пробелов.');
  }

  if (!passwordPattern.test(password)) {
    throw new Error('Пароль должен содержать минимум 8 символов и не содержать пробелов.');
  }
};

export default async (name, surname, login, password, role = 'teacher') => {
  try {
    validateInput(name, surname, password);

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, surname, login, password: password_hash, role }])
      .select()
      .single();

    if (error) {
      console.error('Error inserting user:', error);
      throw new Error('Не удалось создать пользователя');
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
