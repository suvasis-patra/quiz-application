import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { ObjectId } from "mongoose";
export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(password: string, hashPassword: string) {
  const isCorrect = await bcrypt.compare(password, hashPassword);
  return isCorrect;
}

export function generateToken(payload: { user_id: ObjectId }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
}

export function decodeToken(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  return payload;
}

export async function getUserById(userid: string) {
  try {
    const user = await User.findById(userid);
    if (!user) {
      throw new Error("Access denied");
    }
    return user;
  } catch (error) {
    console.log("ERROR FINDING USER: ", error);
  }
}
