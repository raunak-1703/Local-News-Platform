import { create } from "zustand";
import API from "../services/api.js";

const usePostStore = create((set) => ({
  posts: [],
  trendingPosts: [],
  currentPost: null,
  comments: [],
  loading: false,
  error: null,

  // Fetch all posts
  fetchPosts: async () => {
    set({ loading: true, error: null });

    try {
      const res = await API.get("/posts");
      set({ posts: res.data.posts, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch posts ",
        loading: false,
      });
    }
  },

  // Fetch trending posts

  fetchTrending: async () => {
    try {
      const res = await API.get("/posts/trending");
      set({ trendingPosts: res.data });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch trending posts",
      });
    }
  },

  // fetch single post
  fetchPost: async (postId) => {
    set({ loading: true, error: null });

    try {
      const res = await API.get(`/posts/${postId}`);
      set({ currentPost: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Post not found",
        loading: false,
      });
    }
  },

  // Create post
  createPost: async (postData) => {
    try {
      const res = await API.post("/posts", postData);
      set((state) => ({
        posts: [res.data, ...state.posts],
      }));
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create post",
      });
      return false;
    }
  },

  // Toggle upvote
  upvotePost: async (postId) => {
    try {
      const res = await API.post(`/posts/${postId}/upvote`);

      set((state) => ({
        // 1. Update the main posts list
        posts: state.posts.map((p) =>
          p._id === postId
            ? {
                ...p,
                upvoteCount: res.data.upvoteCount,
                upvotes: res.data.upvotes,
              }
            : p
        ),

        // 2. Update the currently viewed post (Post Details Page)
        currentPost:
          state.currentPost?._id === postId
            ? {
                ...state.currentPost,
                upvoteCount: res.data.upvoteCount,
                upvotes: res.data.upvotes,
              }
            : state.currentPost,

        // 3. Update the trending posts list (Home Sidebar)
        trendingPosts: state.trendingPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                upvoteCount: res.data.upvoteCount,
                upvotes: res.data.upvotes,
              }
            : p
        ),
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to upvote" });
    }
  },
  //Fetch comments
  fetchComments: async (postId) => {
    try {
      const res = await API.get(`/comments/${postId}`);
      const sortedComments = res.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
      set({ comments: res.data });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch comments",
      });
    }
  },

  // Add comment
  addComment: async (postId, content) => {
    try {
      const res = await API.post(`/comments/${postId}`, { content });
      const newComment = res.data;

      set((state) => ({
        comments: [newComment, ...state.comments],

        currentPost: state.currentPost
          ? {
              ...state.currentPost,
              commentsCount: state.currentPost.commentsCount + 1,
            }
          : state.currentPost,
      }));

      return newComment;
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add comment",
      });
      return false;
    }
  },

  // Report post
  reportPost: async (postId, reason) => {
    try {
      const response = await API.post(`/posts/${postId}/report`, { reason });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || " Failed to report post" });
      return false;
    }
  },

  // Dashboard stats
  getDashboardStats: async () => {
    const res = await API.get("/users/dashboard");
    return res.data;
  },

  clearCurrentPost: () => {
    set({
      currentPost: null,
      comments: [],
    });
  },

 
}));

export default usePostStore;
