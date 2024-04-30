import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoutes = async(req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token)  return res.status(401).json({error : "Unauthorized - No token Provided"})
      
            
        const decode = jwt.verify(token , process.env.JWT_SECRET);
        if(!decode) return res.status(401).json({error : "Unauthorized - Invalid Token"})

        
        const user = await User.findById(decode.userId).select("-password")
        if(!user)   return res.status(404).json({error :"User Not Found"})

        // console.log("getting req.user : " ,req.user);
        req.user = user; // itself sender
        next();
    } catch (error) {
        console.log("error in protectRoutes : ", error.message)
        res.status(500).json({error : "Internal Server error"})
    }
}

export default protectRoutes;