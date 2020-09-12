import express from 'express';
import DistributionStatus from './controller';

const app = express();

app.get('/', DistributionStatus.Fetch);

export default app;
