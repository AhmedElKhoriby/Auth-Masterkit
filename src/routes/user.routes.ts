import express from 'express';
import validate from '../middleware/validate.middleware';
import { createUserSchema } from '../schemas/user.schema';
import { createUserHandler } from '../controller/user.controller';

const router = express.Router();

router.post('', validate(createUserSchema), createUserHandler);

export default router;
