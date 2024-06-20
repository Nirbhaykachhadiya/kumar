import { Router } from "express";
import { login, signUp } from "../services/userService.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);


export default userRouter;
