import React from 'react'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Newspaper, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import gsap from "gsap";

const Login = () => {
  const navigate = useNavigate();
  const {login,isAuthenticated,loading} =useAuthStore();

  const [formData,setFormData] = useState({
    email:'',
    password:'',
  })

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');

      gsap.fromTo(
      ".login-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    }
  },[isAuthenticated,navigate])

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const success = await login(
      formData.email,
      formData.password
    );

    if(success){
      toast.success('Login successful');
      navigate('/')
    }
    else{
      toast.error('Invalid credentials');
    }
  }
  return (
     <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500 flex items-center justify-center p-4">
      <Card className="login-card w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
            <Newspaper className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Login to continue to LocalNews
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
            disabled={loading}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Login