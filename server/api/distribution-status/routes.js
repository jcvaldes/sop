import express from 'express';
import DistributionStatusController from './controller';

const app = express();

app.get('/', DistributionStatusController.Fetch);

export default app;
