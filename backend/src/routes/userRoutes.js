import express from 'express';
import { getMyDashboard, getUserProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = express.Router()

userRouter.get('/:userId', getUserProfile);
userRouter.get('/me/dashboard',protect,getMyDashboard)

export default userRouter;