import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    console.log("Verifying user with details : ",req.params.id)
    const token = req.cookies.access_token;
    // console.log(token);
    if(!token){
        console.log("No token found");
        return next(errorHandler(401,"You are not authorized!"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,"Token is not valid!"))
        console.log("user verified",user);
        req.user = user;
        console.log("jumping to user controller")
        next();
    })
}