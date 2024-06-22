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

export const fetchPaperSeterQue = asyncHandler(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new ApiError(
      400,
      "not able to fetch userId from userMiddleware in fetchPaperSeterQue"
    );
  }
  const questions = await prisma.que.findMany({
    where: {
      queSeterId: userId,
    },
    orderBy: {
      id: "asc", // or 'desc' for descending order
    },
  });

  if (!questions) {
    throw new ApiError(
      400,
      "error accur while fetching ques from quemodel with userId in fetchPaperSeterQue"
    );
  }
  res
    .status(200)
    .send(
      new ApiResponse(200, questions, "fetchPaperSeterQue fetch Successfully")
    );
});

export const updateQuestion = asyncHandler(async (req, res) => {
  console.log(req.body);
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
      "not able to fetch chepter ,question,option1,option2,option3,option4,answer from req.body in updateQue"
    );
  }

  const queId = req.body.queId;
  if (!queId) {
    throw new ApiError(
      400,
      "not able to fetch queId from req.body in updateQuestion"
    );
  }

  const product = await prisma.que.update({
    where: {
      id: queId,
    },
    data: {
      chepter,
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
    },
  });
  if (!product) {
    throw new ApiError(400, "failure while updating product");
  }

  res
    .status(200)
    .send(
      new ApiResponse(200, product, "fetchPaperSeterQue fetch Successfully")
    );
});

export const deleteQue = asyncHandler(async (req, res) => {
  const queId = req.body.id;
  if (!queId) {
    throw new ApiError(
      400,
      "not able to fetch queId from req.body in deleteQue"
    );
  }
  const deletedQue = await prisma.que.delete({
    where: {
      id: queId,
    },
  });

  res
    .status(200)
    .send(new ApiResponse(200, deletedQue, "deleteQue Successfully"));
});
