import React, { useEffect, useState } from "react";
import { Shield, Trash2, AlertTriangle, Check, X } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import gsap from "gsap";
import API from "../services/api";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Admin = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [reports, setReports] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [loading, setLoading] = useState(true);

  /* -------------------- AUTH GUARD -------------------- */
  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Admin access required");
      navigate("/");
    }
  }, [user, navigate]);

  /* -------------------- FETCH DATA -------------------- */
  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const postsRes = await API.get("/admin/posts")
      setPosts(postsRes.data);
      const reportsRes = await API.get('/admin/reports')

      setReports(reportsRes.data)
    } catch (err) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  /* -------------------- ANIMATIONS -------------------- */
  useEffect(() => {
    gsap.fromTo(
      ".admin-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
    );
  }, [activeTab, posts, reports]);

  /* -------------------- ACTIONS -------------------- */
  const deletePost = async (postId) => {
    if (!window.confirm("Delete this post permanently?")) return;

    try {
      await API.delete(`/admin/posts/${postId}`);
      setPosts(posts.filter((p) => p._id !== postId));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const resolveReport = async (reportId, deletePostFlag = false) => {
    try {
      await API.delete(`/admin/reports/${reportId}`);
      setReports(reports.filter((r) => r._id !== reportId));

      if (deletePostFlag) {
        toast.success("Post deleted & report resolved");
        fetchAdminData();
      } else {
        toast.success("Report dismissed");
      }
    } catch {
      toast.error("Failed to resolve report");
    }
  };

  /* -------------------- UI -------------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Loader text="Loading posts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-red-600" />
            <h1 className="text-4xl font-bold">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Moderate posts & reports</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "posts" ? "default" : "outline"}
            onClick={() => setActiveTab("posts")}
          >
            Posts ({posts.length})
          </Button>

          <Button
            variant={activeTab === "reports" ? "default" : "outline"}
            onClick={() => setActiveTab("reports")}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reports ({reports.length})
          </Button>
        </div>

        {/* POSTS */}
        {activeTab === "posts" && (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post._id} className="admin-card p-6">
                <div className="flex justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{post.title}</h3>

                    <div className="flex gap-2 my-2">
                      <Badge>{post.category}</Badge>
                      <Badge variant="outline">{post.location}</Badge>
                    </div>

                    <p className="text-gray-600 line-clamp-2">{post.content}</p>

                    <p className="text-sm text-gray-500 mt-2">
                      By {post.author?.name} • {post.upvoteCount} upvotes •{" "}
                      {post.commentsCount} comments
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePost(post._id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* REPORTS */}
        {activeTab === "reports" && (
          <div className="space-y-4">
            {reports.length === 0 ? (
              <Card className="p-10 text-center">
                <Check className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <p>No pending reports everything looks good</p>
              </Card>
            ) : (
              reports.map((report) => (
                <Card
                  key={report._id}
                  className="admin-card p-6 border-orange-200 bg-orange-50 gap-2"
                >
                  <h3 className="font-bold mb-1">
                    Reported Post: {report.posts?.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-1">
                    Reported by {report.reportedBy?.name}
                  </p>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 mt-1">
                        <p className="text-gray-700 line-clamp-3">{report.posts?.content}</p>
                      </div>

                  <div className="flex gap-3">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePost(report?.posts._id, true)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Post
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => resolveReport(report._id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Dismiss
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
