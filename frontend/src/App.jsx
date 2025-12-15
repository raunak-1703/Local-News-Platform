import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
    
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path ='/create' element={<CreatePost/>}/>
          <Route path ='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors closeButton expand />
    </>
  );
};

export default App;
