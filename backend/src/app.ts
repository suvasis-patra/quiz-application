import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.router";
import quizRouter from "./routes/quiz.route";

const app = express();

dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/quiz", quizRouter);

export { app };
