import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
dotenv.config();

const port = 3001;

app.listen(port, () => {
  console.log(`your app is running on port ${port}`);
});

import userRouter from "./routes/userRouter.js";

app.use("/api/v1/users", userRouter);
