import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPBASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
