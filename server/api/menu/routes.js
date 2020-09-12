import express from 'express';
import Menu from './controller';

const app = express();

app.get('/', Menu.Fetch);

export default app;
