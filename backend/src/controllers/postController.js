import Post from '../models/postModel.js';

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