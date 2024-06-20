import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const questionListing = asyncHandler(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new ApiError(
      400,
      "not able to fetch userId from userMiddleware in questionListing"
    );
  }
  const { chepter, question, option1, option2, option3, option4, answer } =
    req.body.data;

  if (
    !chepter ||
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !answer
  ) {
    throw new ApiError(
      400,
      "not able to fetch chepter ,question,option1,option2,option3,option4,answer from req.body in questionListing"
    );
  }

  const newQuestion = await prisma.que.create({
    data: {
      chepter,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      queSeterId: userId,
    },
  });
  if (!newQuestion) {
    throw new ApiError(400, "error accur while creating a new que");
  }
  res.status(200).send(new ApiResponse(200, "Question Listed Successfully"));
});
