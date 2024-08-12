import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { authorizeUser } from "../middleware/user.middleware";

const router = Router();

// public routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// private routes
router.route("/current-user").get(authorizeUser, getCurrentUser);
router.route("/logout").get(authorizeUser, logoutUser);

export default router;
