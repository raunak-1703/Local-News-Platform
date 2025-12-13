import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

    res.json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

export const getMyDashboard = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });

    const totalUpvotes = posts.reduce((sum, post) => sum + post.upvoteCount, 0);

    res.json({
      totalPosts: posts.length,
      totalUpvotes,
      recentPosts: posts.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Dashboard" });
  }
};
