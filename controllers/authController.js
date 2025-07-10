import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken"

export const SignUp = async(req,res,next)=>{

    const {firstName, lastName, email, password, role} = req.body;
    

   try {

     if(!firstName || !lastName|| !email || !password){
         const err = new Error("All fields are required");
         err.statusCode = 400;
         return next(err);
 
     }

     const existingEmail = await userModel.findOne({email:email});

     if(existingEmail){
        const err = new Error("Email already exists");
        err.statusCode = 400;
        return next(err);

     }

     const user = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        role

     })

     const token = jwt.sign({UserId:user._id},process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN})

     res.status(201).json({
        success:true,
        message:"User Registered Successfully",
        data:user,
        token
     })

     



   } catch (error) {
  
    return next(error);


   }

}


export const SignIn = async(req, res, next)=>{
    const {email, password} = req.body;

    try {
        if(!email || !password){
            const err = new Error("All fields are required");
            err.statusCode = 400;
            next(err);
    
        }
    
        const existingUser = await userModel.findOne({email:email});
    
        if(!existingUser){
            const err = new Error("No such user exists with that email ");
            err.statusCode = 400;
            next(err);
    
        }
    
        const passwordMatched = await existingUser.comparePassword(password);
    
        if(!passwordMatched){
            const err = new Error("Email or password umatched");
            error.statusCode = 400;
            next(err);
        }
    
        const token = jwt.sign({userId:existingUser._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_IN});
    
        res.status(200).json({
            success:true,
            message:"Successfully Signed In",
            data:token
    
        })
    
    } catch (error) {

        return next(error);
        
    }

}