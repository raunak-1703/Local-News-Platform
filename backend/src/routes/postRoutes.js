import express from 'express';
import { createPost,getAllPosts, getTrendingPosts, reportPost, toggleUpvote, getPostById} from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const postRouter = express.Router();

postRouter.post("/", protect, createPost);
postRouter.get("/trending", getTrendingPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/:id/upvote", protect, toggleUpvote);
postRouter.post("/:id/report", protect, reportPost);
postRouter.get("/", getAllPosts);


export default postRouter;