
const errorMiddleware = (err,req,res,next)=>{
    console.log(err.stack);

    res.status(err.statusCode || 500).json({
        status:false,
        message:err.message || "Internal Server Error"
    })

}

export default errorMiddleware;