import 'dotenv/config';
import pg from 'pg';

export const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const DatabaseConnector = {
  connect: async () => {
    client.connect((error) => {
      if (!error) {
        console.log('[database]: Connection successful');
      } else {
        console.log('[database]: An error occurred while connecting with the database -', error.message);
      }
    });
  },
};
