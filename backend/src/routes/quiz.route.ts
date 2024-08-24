import { Router } from "express";
import {
  checkQuiz,
  createQuiz,
  getQuizByFiltration,
  getQuizById,
} from "../controllers/quiz.controller";
import { authorizeUser } from "../middleware/user.middleware";

const router = Router();

// for logged in user
router.route("/all-quizzes").get(authorizeUser, getQuizByFiltration);
router.route("/get-quiz/:quizId").get(authorizeUser, getQuizById);
router.route("/check-quiz/:quizId").post(authorizeUser, checkQuiz);

// only for admin
router.route("/create-quiz").post(authorizeUser, createQuiz);

export default router;
