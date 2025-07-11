import express from "express";
import { deleteUser, getAllUsers, getUserById, updateUserData } from "../controllers/userController.js";
import { authorizeMiddleware , authGuard } from "../middlewares/authorizeMiddleware.js";

const userRouter = express.Router();

userRouter.get("/users",authorizeMiddleware, authGuard, getAllUsers);
userRouter.get("/users/:id",authorizeMiddleware, getUserById)
userRouter.put("/users/:id",authorizeMiddleware, updateUserData )
userRouter.delete("/users/:id",authorizeMiddleware, authGuard, deleteUser)











export default userRouter;


