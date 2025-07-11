import { userModel } from "../models/userModel.js"



// Along with controllers I also added so that the user that is logged in and the admin can only be able to getuserbyId and update and delete their id's

export const getAllUsers = async(req,res,next)=>{

 try {
       const users = await userModel.find();
   
       if(!users || users.length === 0){
           const err = new Error("No users found!");
           err.statusCode = 400;
           return next(err);
       }
   
       res.status(200).json({
           success:true,
           message:"All users retrieved",
           data:users
   
       })
 } catch (error) {
    return next(error);
    
 }
}


export const getUserById = async(req,res,next)=>{

    const id = req.params.id;
    console.log(id);

    try {

        if(req.user._id.toString() !== id && req.user.role !== "admin"){
            const err = new Error("UnAuthorized Access");
            err.statusCode = 403;
            return next(err);


        }

        const user = await userModel.findById({_id:id});

        if(!user){
            const err = new Error(`No such user exists with the id of ${id}`);
            err.statusCode = 400;
            return next(err);
        }

        res.status(200).json({
            success:true,
            message:`User found with the id of ${id}`,
            data:user
            
        })
        

        
    } catch (error) {
        return next(error);
        
    }

}


export const updateUserData = async(req,res,next)=>{

    const id = req.params.id;
    console.log(id);

    try {

        const updatedData = req.body;

        
        
    if(req.user._id.toString() !== id && req.user.role !== "admin"){
        const err = new Error("UnAuthorized Access");
        err.statusCode = 403;
        return next(err);

    }

    if(!updatedData){
        const err = new Error("No data to update");
        err.statusCode = 400;
        return next(err);
    }

    const user = await userModel.findByIdAndUpdate(id, updatedData, {new:true,  runValidators: true,});

    if(!user){
        const err = new Error("No such id exists");
        err.statusCode = 400;
        return next(err);

    }

    res.status(200).json({
        success:true,
        message:"Data updated Successfully",
        data: user
    })



    
        
    } catch (error) {
        return next(error);
        
    }




}


export const deleteUser = async(req,res,next)=>{
     
    const id = req.params.id;

    if(req.user._id.toString() !== id && req.user.role !== "admin"){
        const err = new Error("UnAuthorized Access");
        err.statusCode = 403;
        return next(err);
    }

    const user = await userModel.findByIdAndDelete(id);

    if(!user){
        const err = new Error(`No such user exists with the id of ${id}`);
        err.statusCode = 400;
        return next(err);

    } 
    res.status(200).json({
        success:true,
        message:`User with the id of ${id} successfully deleted`
    })


}