import { Router } from 'express';
import { userController } from './user.controller.js';

export const userRouter = Router();

userRouter.get('/', userController.getAll);
