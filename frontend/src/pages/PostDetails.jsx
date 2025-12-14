import React from 'react'
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowBigUp,
  MessageCircle,
  MapPin,
  Calendar,
  Flag,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CommentBox from "@/components/CommentBox";
import Loader from "@/components/Loader";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import gsap from "gsap";

const postDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {user} = useAuthStore()
    const{currentPost,loading,fetchPost,upvotePost,reportPost,clearCurrentPost} = usePostStore();

    useEffect(()=>{
        fetchPost(id);
        return()=>clearCurrentPost();
    },[id])

    useEffect(() => {
    if (currentPost) {
      gsap.fromTo(
        ".post-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [currentPost]);

  const handleUpvote = async ()=>{
    if(!user){
        toast.error('Please login to upvote');
        return;
    }
    await upvotePost(id);
  };

  const handleReport = async ()=>{
    if(!user){
        toast.error('Please login to report');
        return;
    }
    await reportPost(id,'User reported');
    toast.success('Post reported successfully');
  }

  const handleShare = ()=>{
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  }

  if(loading || !currentPost){
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Loader text='Loading post...'/>
        </div>
    )
  }

  const isUpvoted = currentPost.upvotes?.includes(user?._id)
  const upvotesCount = currentPost.upvotes?.length ||0;

  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>

        <Card className="post-content overflow-hidden">
          {currentPost.media?.[0] && (
            <img
              src={currentPost.media[0]}
              alt={currentPost.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Badge>{currentPost.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {currentPost.location}
              </div>
            </div>

            <h1 className="text-4xl font-bold">{currentPost.title}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${currentPost.author?.name}`}
                className="h-10 w-10 rounded-full"
                alt={currentPost.author?.name}
              />
              <div>
                <p className="font-semibold">{currentPost.author?.name}</p>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(currentPost.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            <p className="text-gray-700 whitespace-pre-wrap">
              {currentPost.content}
            </p>

            <div className="flex items-center gap-4 pt-4 border-t">
              <Button onClick={handleUpvote}>
                <ArrowBigUp className="h-5 w-5 mr-2" />
                {upvotesCount} Upvotes
              </Button>

              <Button variant="outline">
                <MessageCircle className="h-5 w-5 mr-2" />
                {currentPost.commentsCount || 0} Comments
              </Button>

              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>

              {user && (
                <Button
                  variant="outline"
                  onClick={handleReport}
                  className="ml-auto"
                >
                  <Flag className="h-5 w-5 mr-2" />
                  Report
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div className="post-content mt-6">
          <CommentBox postId={id} />
        </div>
      </div>
    </div>
  );
  
}

export default postDetails