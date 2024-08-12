import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
export async function authorizeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("TOKEN IS :", token);
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!payload || !payload.user_id) {
      throw new Error("Access denied");
    }
    const user = await User.findById(payload.user_id);
    if (!user) throw new Error("User not found");
    req.headers["userId"] = user._id.toString();
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: "unauthorized user" });
    }
  }
}
