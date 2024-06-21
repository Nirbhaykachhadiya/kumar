import { Router } from "express";
import { login, logout, signUp } from "../services/userService.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { fetchPaperSeterQue, questionListing, updateQuestion } from "../services/paperSeterService.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(userMiddleware, logout);
userRouter.route("/questionListing").post(userMiddleware,questionListing)
userRouter.route("/fetchPaperSeterQue").post(userMiddleware,fetchPaperSeterQue)
userRouter.route("/updatequestion").post(updateQuestion)


export default userRouter;
