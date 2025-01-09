import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.ANON_PUBLIC);

const createUser = async (username, surname, email, password_hash) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      { username, surname, email, password_hash }
    ])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export { createUser };
