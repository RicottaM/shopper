import express from 'express';
import 'dotenv/config';
import { connectToDatabase } from './db/connect.js';

const app = express();
const port = Number(process.env.SERVER_PORT);

(async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  app.get((res, req) => {
    res.send(404);
  });
})();
