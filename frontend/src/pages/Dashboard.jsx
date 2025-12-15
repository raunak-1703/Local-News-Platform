import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from 'date-fns';
import { TrendingUp, FileText, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import API from "@/services/api";
import Loader from "@/components/Loader";
import gsap from "gsap";

const Dashboard = () => {
  const {user} = useAuthStore()
  const [stats,setStats] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
   const fetchStats = async ()=>{
    try {
      const res = await API.get('/users/dashboard');
      setStats(res.data);
    } catch (error) {
      setStats(null);
    } finally{
      setLoading(false)
    }
   } 
   fetchStats()

   gsap.fromTo(
      ".stat-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1 }
    );
  },[])

  if(loading){
    return (
      <div className="flex justify-center items-center w-screen h-screen">
              <Loader text="Loading posts..." />
            </div>
    )
  }

    if (!stats) {
    return (
      <div className="p-10 text-center text-gray-500">
        Failed to load dashboard
      </div>
    );
  }
  // function to change the yyyy-mm-dd to Month Name Date
const formatDateTick = (tickItem) => {
    // Check if the tickItem is a valid string, otherwise return it as is.
    if (!tickItem || typeof tickItem !== 'string') return tickItem;
    
    // 1. Parse the 'YYYY-MM-DD' string into a Date object
    const dateObject = parseISO(tickItem);
    
    // 2. Format the Date object into 'MMM d' (e.g., Dec 16)
    return format(dateObject, 'MMM d');
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome back, {user?.name}
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="stat-card p-6 bg-cyan-500">
            <FileText />
            <h2 className="text-3xl">{stats.totalPosts}</h2>
            <p>Total Posts</p>
          </Card>

          <Card className="stat-card p-6 bg-orange-400">
            <TrendingUp />
            <h2 className="text-3xl">{stats.totalUpvotes}</h2>
            <p>Total Upvotes</p>
          </Card>

          <Card className="stat-card p-6 bg-teal-400">
            <MessageCircle />
            <h2 className="text-3xl">{stats.totalComments}</h2>
            <p>Total Comments</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="mb-4 font-bold">Upvotes per Post</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.postsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                <XAxis dataKey="name" tick={{ fontSize: 12 }}
                  stroke="#6b7280" />
                <YAxis stroke="#6b7280"/>
                <Tooltip  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}/>
                <Legend />
                <Bar dataKey="upvotes" 
                  fill="url(#colorUpvotes)" 
                  radius={[8, 8, 0, 0]}/>
                   <defs>
                  <linearGradient id="colorUpvotes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={1} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 font-bold">Engagement Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.engagementOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }}
                  stroke="#6b7280" tickFormatter={formatDateTick}/>
                <YAxis stroke="#6b7280"/>
                <Tooltip contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="#f97316" 
                  strokeWidth={3}
                  dot={{ fill: '#f97316', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard