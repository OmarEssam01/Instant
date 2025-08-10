import { upsertStreamUser } from "../lib/stream.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function signup(req , res){
    const {email,fullName,password} = req.body
    try {
        if (!email || !fullName || !password){
            return res.status(400).json({message: "all fields are required" })
        }
        if (password.length<6){
            return res.status(400).json({message: "Password cannot be less than 6 letters"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid Email Format"})
        }
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).json({message: "Email ALready Exists"})
        }
        const idx = Math.floor(Math.random()*100) + 1

        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic : randomAvatar,
        })
        try {
            await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.fullName,
            Image: newUser.profilePic
        })
        console.log(`Stream user created for ${newUser.fullName} `);
        } catch (error) {
            console.log("Error creating Stream user" , error)
        }
        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        })
        res.cookie("jwt", token , {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT = "production"
        })
        res.status(201).json({success : true , user : newUser})
    } catch (error) {
        console.log("Error in SignUp Controller", error);
        res.status(500).json({message: "internal server error in signup man !!!"})
    }


}
export async function login(req , res){
    try {
        const {email,password}=req.body
        if(!email||!password){
            return res.status(400).json({message:"all fields are required."})
        }
     const user = await User.findOne({email})
     if(!user){
        return res.status(400).json({message: "Invalid Email or password"})
     }
     const isPasswordCorrect = await user.matchPassword(password)
     if(!isPasswordCorrect){
        return res.status(401).json({message: "Invalid Email or Password"})
     }
     const token = jwt.sign({userId: user._id, } , process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
     })
     res.cookie("jwt",token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT = "production"
     })
     res.status(200).json({success: true , user})
    } catch (error) {
        console.log("Error in login Controller", error);
        res.status(500).json({message: "internal Server Error bruh "})
    }
}
export function logout(req , res){
    res.clearCookie("jwt")
    res.status(200).json({success: true , message: "Logout Successful"})
}
export async function onboard ( req, res ) {
    try {
        
        const userId = req.user._id
        const {fullName , bio , nativeLanguage , learningLanguage , location} = req.body
        if(!fullName || !bio  || !nativeLanguage  || !learningLanguage || !location){
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !learningLanguage && "learningLanguage",
                    !nativeLanguage && "nativeLanguage",
                    !location && "location bitch"
                ].filter(Boolean)
    
            })
        }
    
        const updatedUser = await User.findByIdAndUpdate(userId,{
            ...req.body,
            isOnboarded: true,
        },{new:true})
        if(!updatedUser){
            return res.status(404).json({message: "User not found"})
        }
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || ""
            })
            console.log(`Stream User was updated successfully for ${updatedUser.fullName}` );
        } catch (streamError) {
            console.log("Error Updating Stream User ", streamError.message);
        }
        res.status(200).json({success: true , user:updatedUser})
    } catch (error) {
        console.log("Onboarding Error", error);
        res.status(500).json({message:"Internal server Error"})
    }
}
