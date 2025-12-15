import express from 'express';
import { getAllPostsAdmin,deletePostAdmin,getReports, resolveReports, } from '../controllers/adminController.js';
import adminOnly from '../middleware/adminMiddleware.js';
import protect from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.get('/posts',protect,adminOnly,getAllPostsAdmin);
adminRouter.delete('/posts/:postId', protect,adminOnly,deletePostAdmin);
adminRouter.get('/reports',protect,adminOnly,getReports);
adminRouter.delete('/reports/:reportId',protect,adminOnly,resolveReports)

export default adminRouter;
