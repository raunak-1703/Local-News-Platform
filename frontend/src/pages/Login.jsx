import React from "react";
import useAuthStore from "../store/authStore.js";
import { useState } from "react";
import {toast} from 'sonner'
import Layout from "../components/Layout.jsx";

const Login = () => {
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email,password)
      toast.success('Logged in successfully')
    } catch (error) {
      toast.error('Login failed')
    }
    
  };
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 w-full">
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );

};

export default Login;



