import express from 'express';
import { getMyDashboard, getUserProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = express.Router()

userRouter.get('/dashboard',protect,getMyDashboard)
userRouter.get('/:userId', getUserProfile);

export default userRouter;