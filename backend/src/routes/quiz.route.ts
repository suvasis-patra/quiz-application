import { Router } from "express";
import {
  createQuiz,
  getQuizByFiltration,
  getQuizById,
} from "../controllers/quiz.controller";
import { authorizeUser } from "../middleware/user.middleware";

const router = Router();

// for logged in user
router.route("/all-quizzes").get(authorizeUser, getQuizByFiltration);
router.route("/get-quiz/:quizId").get(authorizeUser, getQuizById);

// only for admin
router.route("/create-quiz").post(authorizeUser, createQuiz);

export default router;
