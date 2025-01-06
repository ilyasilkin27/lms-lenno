import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createUser = async (username, email, password_hash) => {
  const query =
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
  const values = [username, email, password_hash];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export { createUser };
