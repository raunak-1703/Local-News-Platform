import cloudinary from '../lib/cloudinaryConfig.js';
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

export const deletePostAdmin = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.media && post.media.length > 0) {
            const mediaUrl = post.media[0].url; 

            const publicId = mediaUrl.split('/').pop().split('.')[0];
            

            await cloudinary.uploader.destroy(publicId);
        }

      
        await Post.findByIdAndDelete(req.params.postId);

       
        await Report.deleteMany({ post: req.params.postId });

        return res.json({ message: 'Post deleted successfully' });

    } catch (error) {
        
        console.error("Error deleting post:", error); 
        res.status(500).json({ message: 'Error deleting post' });
    }
}

export const getReports = async (req,res)=>{
    try {
        const reports = await Report.find().populate('posts').populate('reportedBy','name')
        res.json(reports);
    } catch (error) {
        res.status(500).json({message:'Error fetching reports'});
    }
};

export const resolveReports = async (req, res) => {
    try {
       
        const deletedReport = await Report.findByIdAndDelete(req.params.reportId);

        if (!deletedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        return res.json({ message: 'Report resolved and deleted successfully' });
    } catch (error) {
        console.error("Error resolving report:", error);
        res.status(500).json({ message: 'Error resolving reports' });
    }
}