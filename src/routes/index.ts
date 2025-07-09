import express from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';

const router = express.Router();

// http://localhost:3000/healthcheck
router.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

// Mount user and auth routes
router.use('/api/users', userRouter);
router.use('/api/auth', authRouter);

export default router;
