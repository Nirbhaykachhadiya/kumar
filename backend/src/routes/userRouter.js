import { Router } from "express";
import { login, logout, signUp } from "../services/userService.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(userMiddleware, logout);

export default userRouter;
