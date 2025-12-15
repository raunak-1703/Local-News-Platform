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
import gsap from "gsap";

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

    useEffect(()=>{
        gsap.fromTo(
            '.create-form',
             { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
    },[])

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(!file) return;
    }
  return (
    <div>Create Post</div>
  )
}

export default CreatePost