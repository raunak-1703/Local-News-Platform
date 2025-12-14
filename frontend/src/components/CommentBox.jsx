import React from 'react'
import { useEffect, useState } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import useAuthStore from "@/store/authStore";
import usePostStore from '../store/postStore';
import API from "@/services/api";
import { toast } from "sonner";
const CommentBox = ({postId}) => {
    const { user } = useAuthStore();
  const { comments, fetchComments, addComment } = usePostStore();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
    
    // Fetching comments
    useEffect(()=>{
        fetchComments(postId);
    },[postId]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!content.trim()) return;

        if(!user){
            toast.error('Please login to comment');
            return;
        }

        setSubmitting(true);
        const success = await addComment(postId,content);

        if(success){
            setContent('');
            toast.success('Comment Added');
        }
        else{
            toast.error('Failed to add comment');
        }

        setSubmitting(false);
    }
  return (
        <div className="space-y-6">
      {/* Add Comment */}
      {user && (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={submitting}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!content.trim() || submitting}
              >
                <Send className="h-4 w-4 mr-2" />
                {submitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Comments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Comments ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No comments yet
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment._id} className="p-4">
              <div className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {comment.author?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(
                        new Date(comment.createdAt),
                        { addSuffix: true }
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                    {comment.text}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default CommentBox