import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req,res)=>{
    const {name,email,password,location}= req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:'User already exists'});
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password:hashedpassword,
            location
        })

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    } catch (error) {
       
       return res.status(500).json({message:'Error creating user'});
    }
}

export const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Invalid credentials'})
        }
        else{
            return res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id),
            })
        }
    } catch (error) {
        
         return res.status(500).json({message:'Error Logging user'});
    }
}