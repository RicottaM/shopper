import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const connectToDatabase = async () => {
  client.connect((error) => {
    if (!error) {
      console.log('[database]: Connection succesful');
    } else {
      console.log('[database]: An error occured while connecting with database - ', error.message);
    }
  });

  client.query('SELECT * FROM users', (error, res) => {
    if (!error) {
      console.log('[database]: Fetching data successful\n', res.rows);
    } else {
      console.log('[database]: An error occured while fetching data - ', error.message);
    }

    client.end();
  });
};
