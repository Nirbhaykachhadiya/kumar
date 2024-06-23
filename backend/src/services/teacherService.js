import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchAllQue = asyncHandler(async (req, res) => {
  const questions = await prisma.que.findMany({
    orderBy: {
      chepter: "asc", // or 'desc' for descending order
    },
  });

  if (!questions) {
    throw new ApiError(
      400,
      "error accur while fetching ques from quemodel in fetchAllQue"
    );
  }
  res
    .status(200)
    .send(new ApiResponse(200, questions, "fetchAllQue fetch Successfully"));
});

export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const queId = req.body.id;

  const order = await prisma.tempOrder.create({
    data: {
      queId: queId,
      buyerId: userId,
    },
  });
  res.status(200).send(new ApiResponse(200, order, "addToCart Successfully"));
});
