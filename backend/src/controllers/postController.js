import Post from "../models/postModel.js";
import { calculatedTrendingScore } from "../utils/trendingScore.js";
import User from "../models/userModel.js";
import Report from '../models/reportedModel.js'

export const createPost = async (req, res) => {
  const { title, content, category, location, media } = req.body;
  const transformedMedia = media?.map(url => ({
        url: url,
        type: 'image' 
    }));
  try {
    const post = await Post.create({
      title,
      content,
      category,
      location,
      media:transformedMedia,
      author: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { postsCount: 1 } });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name location")
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const toggleUpvote = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const userId = req.user._id.toString();
  const index = post.upvotes.findIndex((id) => id.toString() === userId);

  if (index === -1) {
    post.upvotes.push(req.user._id);
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalUpvotes: 1 } });
  } else {
    post.upvotes.splice(index, 1);
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalUpvotes: -1 } });
  }

  post.upvoteCount = post.upvotes.length;
  await post.save();

  res.json({ upvoteCount: post.upvoteCount,
    upvotes: post.upvotes
  });
};

export const getTrendingPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    const sorted = posts
      .map((post) => ({
        post,
        score: calculatedTrendingScore(post),
      }))
      .sort((a, b) => b.score - a.score)
      .map((item) => item.post);
    res.json(sorted.slice(0, 10));
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending posts" });
  }
};

export const reportPost = async (req,res)=>{
    const {reason} = req.body;
    try {
        const report = await Report.create({
        posts:req.params.id,
        reportedBy:req.user._id,
        reason,
        })

        res.status(201).json(report);
    } catch (error) {
      console.log(error)
        res.status(500).json({message:'Error reporting post'});
    }
}

export const getPostById = async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id).populate('author','name email location')
    if(!post){
      return res.status(404).json({message:'Post not found'});
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({message:'Error fetching post'})
  }
}