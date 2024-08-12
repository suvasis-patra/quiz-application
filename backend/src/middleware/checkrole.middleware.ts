import { Response, Request, NextFunction } from "express";

import { User } from "../models/user.model";

export async function checkRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.headers.userId;
    const user = await User.findById(userId);
    if (!user || !user.role) {
      return res
        .status(403)
        .send({ message: "Access denied: User not found or role undefined" });
    }
    if (user.role === "admin") {
      return next();
    }
    return res
      .status(403)
      .send({ message: "Access denied: Insufficient permissions" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
}
