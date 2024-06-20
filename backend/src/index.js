import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const port = 3001;

app.listen(port, () => {
  console.log(`your app is running on port ${port}`);
});

import userRouter from "./routes/userRouter.js";

app.use("/api/v1/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
