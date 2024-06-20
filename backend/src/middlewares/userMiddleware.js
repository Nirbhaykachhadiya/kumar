import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const userMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ApiError(
        400,
        "error accur fetch token from cookie in user middleware"
      );
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(400, "error accur decodedToken");
    }
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log("error accur in userMiddleware", error.message);
  }
});
