import React from 'react'
import useAuthStore from '../store/authStore'
import usePostStore from '../store/postStore';
import { Card, CardContent, CardFooter, CardHeader } 
from '@/components/ui/card';
import { Button } from "@/components/ui/button";

import {
  ArrowBigUp,
  MessageCircle,
  MapPin,
  Calendar,
  Flag,
  Badge,
} from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';


const PostCard = ({post,onReport}) => {
    const {user} = useAuthStore();
    const {upvotePost} = usePostStore()

    const hasUpvoted = user?post.upvotes?.includes(user._id):false;

    const handleUpvote = async (e)=>{
        e.preventDefault();
        e.stopPropagation()
        if(!user) return;
        await upvotePost(post._id);
    };

    const handleReport = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onReport?.(post);
    }
  return (
      <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/post/${post._id}`}>
        {/* Image */}
        {post.media?.[0]?.url && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.media[0].url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-primary line-clamp-2">
            {post.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-primary border-primary">
              {post.category}
            </Badge>

            <span className="flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {post.location}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.content}
          </p>

          {/* Author */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {post.author?.name?.[0]}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {post.author?.name}
              </p>
              <span className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUpvote}
              className={`gap-1 ${
                hasUpvoted
                  ? "text-orange-600"
                  : "text-muted-foreground hover:text-orange-600"
              }`}
            >
              <ArrowBigUp
                className={`h-5 w-5 ${
                  hasUpvoted ? "fill-orange-600" : ""
                }`}
              />
              <span className="font-semibold">
                {post.upvoteCount}
              </span>
            </Button>

            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">
                {post.commentsCount || 0}
              </span>
            </div>
          </div>

          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReport}
              className="text-muted-foreground hover:text-red-600"
            >
              <Flag className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Link>
    </Card>
  )
}

export default PostCard