import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Calendar,
  Mail,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PostCard from "@/components/PostCard";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import gsap from "gsap";

const Profile = () => {
  const { user, } = useAuthStore();
  const { fetchPosts,posts } = usePostStore();

  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUpvotes: 0,
    totalComments: 0,
  });
  useEffect(()=>{
    if(posts.length===0){
        fetchPosts()
    }
  },[fetchPosts,posts.length])

  useEffect(() => {
    if (!user) return;


    const myPosts = posts.filter((post) => post.author?._id === user._id);

    setUserPosts(myPosts);

    const totalUpvotes = myPosts.reduce(
      (sum, p) => sum + (p.upvoteCount || 0),
      0
    );

    const totalComments = myPosts.reduce(
      (sum, p) => sum + (p.commentsCount || 0),
      0
    );

    setStats({
      totalPosts: myPosts.length,
      totalUpvotes,
      totalComments,
    });

    gsap.fromTo(
      ".profile-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [user, posts]);

  if (!user) return null;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <Card className="profile-card p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>

              <Badge className="mt-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                {user.role === "admin" ? "Administrator" : "Citizen Journalist"}
              </Badge>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {user.email}
                </div>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {user.location}
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Joined {new Date(user.createdAt || Date.now()).toDateString()}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="profile-card p-6">
            <p className="text-sm text-gray-500">Total Posts</p>
            <p className="text-3xl font-bold">{stats.totalPosts}</p>
            <FileText className="h-8 w-8 text-blue-600 mt-2" />
          </Card>

          <Card className="profile-card p-6">
            <p className="text-sm text-gray-500">Total Upvotes</p>
            <p className="text-3xl font-bold">{stats.totalUpvotes}</p>
            <TrendingUp className="h-8 w-8 text-orange-600 mt-2" />
          </Card>

          <Card className="profile-card p-6">
            <p className="text-sm text-gray-500">Total Comments</p>
            <p className="text-3xl font-bold">{stats.totalComments}</p>
            <User className="h-8 w-8 text-green-600 mt-2" />
          </Card>
        </div>

        {/* User Posts */}
        <div className="profile-card">
          <h2 className="text-2xl font-bold mb-6">My Posts</h2>

          {userPosts.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              You haven’t posted anything yet.
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
