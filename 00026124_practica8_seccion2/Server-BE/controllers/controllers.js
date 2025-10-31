import { pool } from '../data/connection.js';

const getUsers = async (request, response) => {
  try {
    const results = await pool.query('SELECT * FROM users ORDER BY id ASC');
    response.status(200).json(results.rows);
  } catch (error) {
    console.error('Error getting users:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const results = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    response.status(200).json(results.rows);
  } catch (error) {
    console.error('Error getting user by id:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

const createUser = async (request, response) => {
  try {
    const { name, email } = request.body;
    const results = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  } catch (error) {
    console.error('Error creating user:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id]
    );
    response.status(200).send(`User modified with ID: ${id}`);
  } catch (error) {
    console.error('Error updating user:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    response.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
