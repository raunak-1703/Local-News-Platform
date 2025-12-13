import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      requuired: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    location: {
      type: String,
    },
    totalPosts:{
        type:Number,
        default: 0,
    },
    totalUpvotes:{
        type:Number,
        default:0,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
