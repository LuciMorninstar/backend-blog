import express from "express"
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/authRoutes.js";
import errroMiddleware from "./middlewares/errorMiddleware.js"
import cors from "cors";

import "dotenv/config"
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());



app.use(cors({
    origin:"localhost:5173",
    method:["GET", "POST", "PATCH", "PUT" ]
}))

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter)

app.get("/", (req,res,next)=>{
    res.json("This is homepage");
})


app.use(errorMiddleware);


app.listen(9000, ()=>{
    console.log(`Server has been established at http://localhost:${PORT}`);

      connectDB();

    

})

