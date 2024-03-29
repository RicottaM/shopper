import { client } from '../../db/connect.js';

export const userService = {
  getAll: async () => {
    const users = await client.query('SELECT * FROM users');

    return users.rows;
  },
};
