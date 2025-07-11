
// login protected route ma include garni

import jwt from "jsonwebtoken"

export const authorizeMiddleware = async(req,res,next)=>{

    let token;

try {
    
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    
             token = req.headers.authorization.split(" ")[1];
    
            
        if(!token){
            const err = new Error("UnAuthorized Access");
            err.statusCode = 401;
            return next(err);
    
        }
    
        const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = decodetoken._id;
    
        if(!req.user){
            const err = new Error("No such user exist with that token");
            err.statusCode = 401;
            return next(err);
            
        }
    
        return next();
    
        }

        else{
            const err = new Error("Missing headers authorization");
            err.statusCode = 401;
            return next(err);

        }
    
} catch (error) {

    next(error);
    
}
    


}

export const authGuard = async(req,res,next)=>{
    

try {
    
        if(req.user && req.user.role == "admin"){
            return next();
    
        }

        const err = new Error("Unauthorized Access");
        err.statusCode = 401;
        return next(err);

        
    

} catch (error) {
    next(error);
    
}



}