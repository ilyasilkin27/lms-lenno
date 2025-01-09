import supabase from '../../config/supabase.js';

const checkExistingUser = async (login) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('login', login)
    .maybeSingle();

  if (error) {
    console.error('Error checking user:', error);
    throw new Error('Не удалось проверить, существует ли пользователь');
  }

  return data;
};

const createUser = async (name, surname, login, password_hash, role = 'teacher') => {
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
};

export { checkExistingUser, createUser };
