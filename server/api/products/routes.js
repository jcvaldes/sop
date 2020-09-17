import express from 'express';
import ProductsController from './controller';

const app = express();

app.get('/', ProductsController.Fetch);

export default app;
