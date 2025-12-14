import React from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, MapPin, Newspaper, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import gsap from "gsap";


const Register = () => {
  const navigate = useNavigate()
  const {register,isAuthenticated,loading} = useAuthStore();

  const [formData,setFormData]= useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    location:'',
  })

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }

      gsap.fromTo(
      ".register-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  },[isAuthenticated,navigate])

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(formData.password!==formData.confirmPassword){
      toast.error('Passwords do not match')
      return;
    }

    const success = await register({name:formData.name,
      email:formData.email,
      password:formData.password,
      location:formData.location,
    })

    if(success){
      toast.success('Account created successfully');
      navigate('/')
    }
    else{
      toast.error('Registration failed')
    }
  }
  return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-blue-700 to-blue-600 flex items-center justify-center p-4">
      <Card className="register-card w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
            <Newspaper className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join LocalNews
          </h1>
          <p className="text-gray-600">
            Become a citizen journalist today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              name="location"
              placeholder="Your location"
              value={formData.location}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            disabled={loading}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                <UserPlus className="h-5 w-5 mr-2" />
                Register
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Register