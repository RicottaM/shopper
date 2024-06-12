import { client } from '../../db/connect.js';
import { ErrorWithStatus } from '../../error/error-with-status.js';

export const userService = {
  getAll: async () => {
    const users = await client.query(`SELECT * FROM users;`);

    if (!users.rows.length) {
      throw new ErrorWithStatus(`Couldn't find any user.`, 404);
    }

    return users.rows;
  },
  getById: async (id) => {
    const user = await client.query(`SELECT * FROM users WHERE user_id = ${id};`);

    if (!user.rows.length) {
      throw new ErrorWithStatus(`Couldn't find any user with given id: ${id}.`, 404);
    }

    return user.rows;
  },
  create: async (newUser) => {
    const user = await client.query(
      `INSERT INTO users (email, password, first_name, last_name) VALUES ('${newUser.email}', '${newUser.password}', '${newUser.name}', '${newUser.last_name}') returning *;`
    );

    if (!user.rows.length) {
      throw new ErrorWithStatus(`Couldn't create new user with given data:\n${newUser}`, 400);
    }

    return {
      message: 'User has been successfully created.',
    };
  },
  update: async (updatedUser, id) => {
    const { email, password, first_name, last_name } = updatedUser;
    let updatedFields = [];

    if (email) updatedFields.push(`email = '${email}'`);
    if (password) updatedFields.push(`password = '${password}'`);
    if (first_name) updatedFields.push(`first_name = '${first_name}'`);
    if (last_name) updatedFields.push(`last_name = '${last_name}'`);

    const updateQuery = `UPDATE users SET ${updatedFields.join(', ')} WHERE user_id = ${id};`;

    const user = await client.query(updateQuery);

    if (!user.rows.length) {
      throw new ErrorWithStatus(`Couldn't find user with given id: ${id}.`, 404);
    }

    return {
      message: 'User has been successfully updated.',
    };
  },
  delete: async (id) => {
    const user = await client.query(`DELETE FROM users WHERE user_id = ${id} returning *;`);

    if (!user.rows.length) {
      throw new ErrorWithStatus(`Couldn't find user with given id: ${id}.`, 404);
    }

    return {
      message: 'User has been successfully deleted.',
    };
  },
};
