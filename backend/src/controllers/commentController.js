import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = async (req,res)=>{
    const {content} = req.body;
    try {
        let comment = await Comment.create({
            text:content,
            post:req.params.postId,
            author:req.user._id,
        })

        await Post.findByIdAndUpdate(req.params.postId,{
            $inc:{commentsCount:1}
        })
        comment = await comment.populate('author', 'name');
        res.status(201).json(comment);
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Error adding comments'})
    }
}

export const getCommentsByPost = async (req,res)=>{
    try {
        const comments = await Comment.find({post: req.params.postId}).populate('author','name')

        res.json(comments);
    } catch (error) {
        res.status(500).json({message:'Error fetching comments'})
    }
}