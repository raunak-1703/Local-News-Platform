import React from "react";
import { useEffect, useState } from "react";
import { Search, Filter, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "sonner";

import PostCard from "@/components/PostCard";
import Loader from "@/components/Loader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import usePostStore from "@/store/postStore";
import useAuthStore from "@/store/authStore";
import { CATEGORIES } from "@/constants/categories";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    posts,
    trendingPosts,
    loading,
    fetchPosts,
    fetchTrending,
    reportPost,
  } = usePostStore();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Fetch Data
  useEffect(() => {
    fetchPosts();
    fetchTrending();
  }, []);

  // Animation
  useEffect(() => {
   // Animation

  // 1. Checking if posts array has content before running .post-card animation
  if (posts && posts.length > 0) {
    gsap.fromTo(
      ".post-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }

  // 2. Checking if trendingPosts array has content before running .trending-item animation
  if (trendingPosts && trendingPosts.length > 0) {
    gsap.fromTo(
      ".trending-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }
}, [posts, trendingPosts]); 


  const handleReport = async (post) => {
    if (!user) {
      toast.error("Please login to report posts");
      return;
    }

    const success = await reportPost(post._id, "User reported");
    if (success) toast.success("Post reported successfully");
    else toast.error("Failed to report post");
  };

  // Filtering feature
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = locationFilter
      ? post.location?.toLowerCase().includes(locationFilter.toLowerCase())
      : true;

    return matchesCategory && matchesSearch && matchesLocation;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 bg-clip-text text-transparent">
            Hyperlocal News Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your community’s voice. Share stories, stay informed.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 md:w-64"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover:scale-105 transition"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Posts */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader text="Loading posts..." />
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-500 text-lg">No posts found.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <div key={post._id} className="post-card">
                    <PostCard post={post} onReport={handleReport} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trending */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h2 className="text-xl font-bold">Trending Now</h2>
              </div>

              <div className="space-y-4">
                {trendingPosts.length === 0 ? (
                  <p className="text-gray-500 text-sm">No trending posts yet</p>
                ) : (
                  trendingPosts.map((post) => (
                    <div
                      key={post._id}
                      className="trending-item cursor-pointer"
                      onClick={() => navigate(`/post/${post._id}`)}
                    >
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                        {post.media?.[0] && (
                          <img
                            src={post.media[0]}
                            alt={post.title}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                        )}

                        <div className="flex-1">
                          <h3 className="text-sm font-semibold line-clamp-2 hover:text-blue-600">
                            {post.title}
                          </h3>
                          <div className="flex gap-2 mt-1 items-center">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-orange-600 font-semibold">
                              {post.upvoteCount||post.upvotes?.length||0} upvotes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
