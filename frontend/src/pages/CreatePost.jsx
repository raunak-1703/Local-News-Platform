import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PenTool, MapPin, Image as ImageIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/authStore";
import usePostStore from "@/store/postStore";
import { CATEGORIES } from "@/constants/categories";
import { toast } from "sonner";


const CreatePost = () => {
    const navigate = useNavigate()
    const {user} = useAuthStore();
    const {createPost} = usePostStore();

    const [loading,setLoading] = useState(false)
    const [imagePreview,setImagePreview] = useState(null);
    const [imageFile,setImageFile]= useState(null);

    const [formData,setFormData] = useState({
        title:'',
        content:'',
        category:CATEGORIES[0],
        location:user?.location||'',
    })


    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const uploadToCloudinary = async ()=>{
        if(!imageFile) return null;
        const form = new FormData();
        form.append('file', imageFile)
        form.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

        const res = await fetch(`https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      return data.secure_url;
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!formData.title || !formData.content){
            toast.error('Please fill all required fields')
            return ;
        }
        setLoading(true)
        try {
            let imageUrl = null;
            if(imageFile){
                imageUrl = await uploadToCloudinary()
            }
            const payload = {
                ...formData, media:imageUrl?[imageUrl]:[]
            }
            const success = await createPost(payload);
            if(success){
                toast.error('Post created successfully')
                navigate('/')
            }else{
                toast.success('Failed to create post');
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally{
            setLoading(false);
        }
    }
  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="create-form p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-orange-500 p-3 rounded-xl">
                <PenTool className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Create Post
            </h1>
            <p className="text-gray-600 mt-2">
              Share news from your neighborhood
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label className='mb-0.5'>Title *</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter headline"
                required
              />
            </div>

            {/* Content */}
            <div>
              <Label className='mb-0.5'>Content *</Label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="min-h-[180px]"
                placeholder="Describe the news..."
                required
              />
            </div>

            {/* Category & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className='mb-0.5'>Category *</Label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className='mb-0.5'>Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Area / locality"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label className='mb-0.5'>Image (optional)</Label>
              <label className="mt-2 flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer">
                <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-4 h-48 w-full object-cover rounded-lg"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white"
              >
                {loading ? "Publishing..." : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Publish
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default CreatePost