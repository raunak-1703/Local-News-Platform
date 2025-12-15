import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Comment from '../models/commentModel.js'
import calculateEngagementOverTime from '../utils/calculateEngagement.js'

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

export const getMyDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ author: userId }).sort({createdAt:-1});

    let totalUpvotes = 0;
    let totalComments = 0;
    const postsData = [];

    posts.forEach(post=>{
      totalUpvotes+=post.upvoteCount
      totalComments+= post.commentsCount || 0;

      postsData.push({
        _id:post._id,
        name:post.title,
        upvotes:post.upvoteCount
      })
    })

    const engagementOverTime = calculateEngagementOverTime(posts)

    res.json({
      totalPosts: posts.length,
      totalUpvotes,
      totalComments,
      postsData,
      engagementOverTime,
      recentPosts: posts.slice(0, 5),
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching Dashboard" });
  }
};
