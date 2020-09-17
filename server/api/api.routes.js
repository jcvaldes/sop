import express from 'express'
import authRoutes from './auth/routes';
import menuRoutes from './menu/routes';
import distributionStatusRoutes from './distribution-status/routes';
import productRoutes from './products/routes';

const app = express();

app.use('/auth', authRoutes)
app.use('/menu', menuRoutes)
app.use('/distribution-status', distributionStatusRoutes)
app.use('/product', productRoutes)

export default app;
