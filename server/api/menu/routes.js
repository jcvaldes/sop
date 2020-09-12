import express from 'express';
import MenuController from './controller';

const app = express();

app.get('/', MenuController.Fetch);

export default app;
