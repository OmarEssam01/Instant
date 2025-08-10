import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const  protectRoute = async (req , res , next) => {
try {
    const token = req.cookies.jwt
    console.log("Token received:", token)
    if(!token){
       return  res.status(401).json({message: "Unauthorized No token Provided "})
    }
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET_KEY)
    console.log("Decoded token:", decodedToken)

    if(!decodedToken){
       return res.status(401).json({message: " Unauthorized Invalid Token BRO"})
    }
    const user = await User.findById(decodedToken.userId).select("-password")
    if(!user){
        return res.status(401).json({message: "Unauthorized User not found"})
    }
    req.user = user 

    next();

} catch (error) {
    console.log("Error in protectRoute Middleware", error);
    res.status(500).json({message: "Internal Server Error"})
}
}