import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    media: [
      {
        url: String,
        type: {
          type: String,
          enum: ["image", "video"],
        },
      },
    ],
    category: {
      type: String,
      enum: [
        "Breaking News",
        "Events",
        "Community Issues",
        "Alerts",
        "Local Stories",
      ],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    upvoteCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post =  mongoose.model("Post", postSchema);

export default Post;
