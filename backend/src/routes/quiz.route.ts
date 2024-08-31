import { Router } from "express";
import {
  checkQuiz,
  createQuiz,
  getQuizByFiltration,
  getQuizById,
  latestQuizzes,
} from "../controllers/quiz.controller";
import { authorizeUser } from "../middleware/user.middleware";

const router = Router();

// for logged in user
router.route("/all-quizzes").get(authorizeUser, getQuizByFiltration);
router.route("/get-quiz/:quizId").get(authorizeUser, getQuizById);
router.route("/check-quiz/:quizId").post(authorizeUser, checkQuiz);
router.route("/get-latest-quizzes").get(authorizeUser, latestQuizzes);

// only for admin
router.route("/create-quiz").post(authorizeUser, createQuiz);

export default router;
