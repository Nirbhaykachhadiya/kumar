import { Router } from "express";
import { login, logout, signUp } from "../services/userService.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { questionListing } from "../services/questionService.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(userMiddleware, logout);
userRouter.route("/questionListing").post(userMiddleware,questionListing)

export default userRouter;
