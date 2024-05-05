import express from 'express';
import 'dotenv/config';
import { DatabaseConnector } from './db/connect.js';
import { userRouter } from './api/users/user.router.js';
import { productRouter } from './api/products/product.router.js';
import { categoryRouter } from './api/categories/category.router.js';
import { locationRouter } from './api/locations/location.router.js';
import { errorHandler } from './error/error-handler.js';

const app = express();
const port = process.env.SERVER_PORT;

await DatabaseConnector.connect();

app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/locations', locationRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});
