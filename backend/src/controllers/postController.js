import Post from '../models/postModel.js';
import { calculatedTrendingScore } from '../utils/trendingScore.js';

export const createPost = async (req,res)=>{
    const {title,content,category,location,media} = req.body;

    try {
        const post = await Post.create({
            title,
            content,
            category,
            location,
            media,
            author: req.user._id
        })
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({message:'Error creating post'});
    }
}

export const getAllPosts = async (req,res)=>{
    try {
        const posts = await Post.find().populate('author','name location').sort({createdAt:-1});

        res.json({posts});
    } catch (error) {
        res.status(500).json({message:'Error fetching posts'});
    }
}

export const toggleUpvote = async (req,res)=>{
    const post = await Post.findById(req.params.id);

    if(!post){
        return res.status(404).json({message:'Post not found'})
    }

    const userId = req.user._id.toString()
    const index = post.upvotes.findIndex((id)=>id.toString()===userId);

    if(index === -1 ){
        post.upvotes.push(req.user._id);
    }
    else{
        post.upvotes.splice(index,1)
    }

    post.upvoteCount = post.upvotes.length;
    await post.save();

    res.json({upvoteCount:post.upvoteCount})
}

export const getTrendingPosts = async (req,res)=>{
    try {
        const posts = await Post.find().populate('author','name');
         const sorted = posts.map((post)=>({
            post,
            score:calculatedTrendingScore(post)      
         }))
         .sort((a,b)=>b.score - a.score)
         .map((item)=>item.post)
         res.json(sorted.slice(0,10))
    } catch (error) {
        res.status(500).json({message:'Error fetching trending posts'})
    }
}