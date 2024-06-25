import { Router } from "express";
import { login, logout, signUp } from "../services/userService.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import {
  deleteQue,
  fetchPaperSeterQue,
  questionListing,
  updateQuestion,
} from "../services/paperSeterService.js";
import {
  addToCart,
  addToCartItems,
  deleteAddToCartQue,
  fetchAllQue,
  fetchPaper,
  savePaperToBackend,

} from "../services/teacherService.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(userMiddleware, logout);
userRouter.route("/questionListing").post(userMiddleware, questionListing);
userRouter
  .route("/fetchPaperSeterQue")
  .post(userMiddleware, fetchPaperSeterQue);
userRouter.route("/updatequestion").post(updateQuestion);
userRouter.route("/deleteque").post(deleteQue);
userRouter.route("/fetchAllQue").post(fetchAllQue);
userRouter.route("/addToCart").post(userMiddleware, addToCart);
userRouter.route("/addToCartItems").post( addToCartItems);
userRouter
  .route("/deleteAddToCartQue")
  .post(userMiddleware, deleteAddToCartQue);
//userRouter.route("/generatePdfBack").post(userMiddleware, generatePdfBack);
userRouter
  .route("/savePaperToBackend")
  .post(userMiddleware, savePaperToBackend);
  userRouter
  .route("/fetchPaper")
  .post(userMiddleware, fetchPaper);

  

export default userRouter;
