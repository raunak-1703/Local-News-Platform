import Post from '../models/postModel.js';
import Report from '../models/reportedModel.js';

export const getAllPostsAdmin = async (req,res)=>{
    try {
        const posts = await Post.find().populate('author','name email').sort({createdAt:-1});

        res.json(posts);
    } catch (error) {
        res.status(500).json({message:'Error fetching posts'});
    }
}

export const deletePostAdmin = async (req,res)=>{
    try {
        await Post.findByIdAndDelete(req.params.postId);

        res.json({message:"Post removed successfully"})
    } catch (error) {
        res.status(500).json({message:'Error deleting post'});
    }
}

export const getReports = async (req,res)=>{
    try {
        const reports = await Report.find().populate('post').populate('reportedBy','name')

        res.json(reports);
    } catch (error) {
        res.status(500).json({message:'Error fetching reports'});
    }
};