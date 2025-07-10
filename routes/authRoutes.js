import express from "express";
import { SignUp, SignIn } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signUp", SignUp);
authRouter.post("/signIn", SignIn )





export default authRouter;