import {create} from 'zustand';
import API from '../services/api.js';

const useAuthStore = create((set)=>({
    user:null,
    token:localStorage.getItem('token') || null,
    loading:false,
    error:null,

    login: async (email,password)=>{
        try {
            set({loading:true,error:null});
            const res = await API.post('/auth/login',{email,password})

            localStorage.setItem('token',res.data.token);

            set({
                user: res.data,
                token: res.data.token,
                loading:false
            })
        } catch (error) {
            set({
                error:error.response?.data?.message || 'Login failed',
                loading:false,
            })
        }
    },

    register: async (data)=>{
        try{
            set({loading:true,error:null});

            const res = await API.post('/auth/register',data);
            localStorage.setItem('token', res.data.token);

            set({
               user:res.data,
               token:res.data.token,
               loading:false, 
            })
        }
        catch(error){
            set({
                error:error.response?.data?.message || 'Registration failed',
                loading:false,
            })
        }
    },
    logout: ()=>{
        localStorage.removeItem('token');
        set({user:null, token:null})
    }
}))

export default useAuthStore;