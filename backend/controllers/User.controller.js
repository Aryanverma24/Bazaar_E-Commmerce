import asyncHandler from "../middlewares/asyncHandler.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import createToken from '../utils/createToken.js'
import jwt from "jsonwebtoken"

const createUser = asyncHandler(async(req,res)=>{
   
    const {username, email, password} = req.body

    if(!password || !username || !email){
        throw new Error("Please fill all the inputs")
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400).send("User already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({username , email , password : hashedPassword})

    try {
        await newUser.save();
        createToken(res, newUser._id)

        res.status(201).json(
            {
                _id: newUser._id ,
                username: newUser.username , 
                email : newUser.email , 
                isAdmin: newUser.isAdmin
            }
        )

    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const loginUser = asyncHandler( async (req,res) => {

    const { email , password } = req.body

    const existingUser =await User.findOne({email})

    if(existingUser){
        
        const isPasswordCorrect = await bcrypt.compare(password , existingUser.password)

        if(isPasswordCorrect){
            createToken(res,existingUser._id)
    
            res.status(201).json(
                {
                    _id: existingUser._id ,
                    username: existingUser.username , 
                    email : existingUser.email , 
                    isAdmin: existingUser.isAdmin
                }
            )
        }
        return 
    }
})

const logoutUser = asyncHandler(async(req,res)=>{

    res.cookie("jwt","",{
        httpOnly : true,
        expires : new Date(0)
    });
    res.status(200).
    json({
        message: "user logout successfully"
    })
});

const getAllUser = asyncHandler(async (req,res)=>{
    //get all users
    const users = await User.find({})
    res.json(users);
})

const getCurrentUserProfile = asyncHandler( async (req,res) => {

    const userToken = req.cookies.jwt;
    const decoded = jwt.verify(userToken,process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select("-password")
    
    if(user){
        res.status(201)
        .json({
            _id : user._id,
            username : user.username,
            email : user.email,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

const updateCurrentUserProfile = asyncHandler(async(req,res)=>{

    const {username , email, password } = req.body
    const userToken = req.cookies.jwt;
    const decoded = jwt.verify(userToken,process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select("-password")

    if(user){
        user.username = username  || user.username
        user.email = email || user.email

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword
        }
        const updatedUser = await user.save();

        res.status(200)
        .json(
            {
                _id : updatedUser._id,
                username : updatedUser.username,
                email : updatedUser.email,
                isAdmin : updatedUser.isAdmin
            }
        )
    }else{
        res.status(404)
        throw new Error("user nor found")
    }
})

const deleteUser = asyncHandler ( async (req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        if(user.isAdmin){
            res.status(404)
            throw new Error("cannot delete admin user")
        }
        await User.deleteOne({_id : user._id})
        res.status(201).json({message : "User Removed successfully"})
    }
    else{
        res.status(401)
        throw new Error("Can't deleted user because of admin rights")
    }
})

const getUserById = asyncHandler (async (req,res)=>{
    const user = await User.findById(req.params.id).select("-password");

    if(user){
        res.status(201)
        .json(user)
    }
    else{
        res.status(404)
        throw new Error("User not find")
    }
})

const updateUserById = asyncHandler (async(req,res)=>{

    const user = await User.findById(req.params.id);
    const {username,email,isAdmin,password} = req.body

    if(user){

        user.username = username || user.username
        user.email = email || user.email
        user.isAdmin = Boolean(isAdmin)

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword
        }
        const updatedUser = await user.save();

        res.status(200)
        .json(
            {
                _id : updatedUser._id,
                username : updatedUser.username,
                email : updatedUser.email,
                isAdmin : updatedUser.isAdmin
            }
        )
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUser,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUser,
    getUserById,
    updateUserById
}