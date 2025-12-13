import React from 'react'
import { useEffect } from 'react'
import API from '../services/api'


const Home = () => {
    useEffect(()=>{
        API.get('/posts').then(res=>console.log(res.data))
    },[])
  return (
    <div className='p-6 text-cyan-950'>Home</div>
  )
}

export default Home