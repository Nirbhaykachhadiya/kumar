import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signUp = asyncHandler(async (req, res) => {
  const { userName, password, role } = req.body;
  if (!userName || !password || !role) {
    throw new ApiError(
      400,
      "not able to fetch userName or password or role from req.body in signup"
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!hashedPassword) {
    throw new ApiError(400, "error accur while hashing a password in signUp");
  }
  const user = await prisma.user.create({
    data: {
      userName,
      password: hashedPassword,
      role,
    },
  });
  if (!user) {
    throw new ApiError(400, "userCreation failed in signUp service");
  }
  res.status(200).send(new ApiResponse(200, user));
});

export const login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new ApiError(
      400,
      "not able to fetch userName or password  from req.body in login"
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      userName,
    },
  });
  if (!user) {
    throw new ApiError(400, "not able to fetch user from db in login");
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    throw new ApiError(400, "password is incorrect");
  }
  const token = jwt.sign(
    { id: user.id, userName: user.userName },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
  if (!token) {
    throw new ApiError(400, "error accur while token creation in login");
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).send(new ApiResponse(200, user));
});
