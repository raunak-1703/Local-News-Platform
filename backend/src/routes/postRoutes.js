import express from 'express';
import { createPost,getAllPosts, getTrendingPosts, reportPost, toggleUpvote} from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const postRouter = express.Router();

postRouter.post('/',protect,createPost);
postRouter.get('/trending', getTrendingPosts);
postRouter.post('/:id/report',protect,reportPost)
postRouter.get('/',getAllPosts);
postRouter.post('/:id/upvote',protect,toggleUpvote);

export default postRouter;