import express from 'express';
import 'dotenv/config';
import { DatabaseConnector } from './db/connect.js';
import { userRouter } from './api/users/user.router.js';

const app = express();
const port = process.env.SERVER_PORT;

await DatabaseConnector.connect();

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get((res, req) => {
  res.send(404);
});
