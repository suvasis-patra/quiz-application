import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.router";
import quizRouter from "./routes/quiz.route";

const app = express();

dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: process.env.CLIENT_URL!,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/dist")));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/quiz", quizRouter);

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

export { app };
