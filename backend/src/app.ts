import express from "express";
import userRouter from "./routes/user.router";
import quizRouter from "./routes/quiz.route";
import cors from "cors";

cors({
  origin: "http://localhost:5173",
  credentials: true,
});

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/quiz", quizRouter);

export { app };
