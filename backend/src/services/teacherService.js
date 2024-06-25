import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { PrismaClient } from "@prisma/client";
import puppeteer from "puppeteer";

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

export const addToCartItems = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const ques = await prisma.tempOrder.findMany({
    where: {
      buyerId: userId,
    },

    include: {
      question: true,
    },
  });

  res
    .status(200)
    .send(new ApiResponse(200, ques, "addToCartQues fetch Successfully"));
});

export const deleteAddToCartQue = asyncHandler(async (req, res) => {
  const id = req.body.id;

  const deleted = await prisma.tempOrder.delete({
    where: {
      id: id,
    },
  });

  res
    .status(200)
    .send(new ApiResponse(200, deleted, "deleteAddToCartQue  Successfully"));
});

export const savePaperToBackend = asyncHandler(async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    throw new ApiError(
      400,
      "error accur fetch userId from req.userId from Middleware in savePaperToBackend function"
    );
  }

  const paper = await prisma.paper.create({
    data: {
      createrId: userId,
    },
  });

  const quesIds = await prisma.tempOrder.findMany({
    where: {
      buyerId: userId,
    },
    select: {
      queId: true,
    },
  });

  for (let i = 0; i < quesIds.length; i++) {
    await prisma.paperQue.create({
      data: {
        paperId: paper.id,
        queId: quesIds[i].queId,
      },
    });
  }

  await prisma.tempOrder.deleteMany({
    where: {
      buyerId: userId,
    },
  });

  res
    .status(200)
    .send(new ApiResponse(200, paper, "savePaperToBackend  Successfully"));
});

export const fetchPaper = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const papers = await prisma.paper.findMany({
    where: {
      createrId: userId,
    },
    include: {
      paperQuestions: true,
    },
  });
  console.log(papers);
  let quests = [];
  for (const element of papers) {
    for (const que of element.paperQuestions) {
      const queOne = await prisma.que.findFirst({
        where: {
          id: que.queId,
        },
      });
      let question = new Object();
      question.question = queOne;
      quests.push(question);
    }
    element.question = quests;
    quests = [];
  }

  // const resp = [];
  // for (const element of papers) {
  //   const ques = await prisma.paperQue.findMany({
  //     where: {
  //       paperId: element.id,
  //     },
  //     include: {
  //       que: true,
  //     },
  //   });
  //   const temp = new Object();
  //   temp.id = element.id;
  //   temp.createdAt = element.createdAt;
  //   temp.ques = ques;
  //   resp.push(temp);
  // }
  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        papers,
        "fetchPaperFrombacksendtofront  Successfully"
      )
    );
});
