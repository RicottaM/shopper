import express from 'express';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get((res, req) => {
  res.send(404);
});
