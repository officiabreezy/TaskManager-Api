import express from 'express';
import userRoutes from './routes/userRoute.js';
import taskRoutes from './routes/taskRoute.js';

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1', taskRoutes);

export default app;
