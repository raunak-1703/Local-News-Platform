import { addComment, getCommentsByPost } from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";
import express from 'express';

const commentRouter = express.Router();

commentRouter.post('/:postId',protect,addComment);
commentRouter.get('/:postId',getCommentsByPost);

export default commentRouter;