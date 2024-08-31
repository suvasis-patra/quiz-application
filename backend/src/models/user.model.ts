import { hashPassword } from "../utils";
import { QuizSchema } from "./quizs.model";
import { Document, model, Schema, ObjectId } from "mongoose";

interface UserRegistration extends Document {
  _id: ObjectId;
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: "user" | "admin";
  quizesCreated: ObjectId[];
  quizesTaken: { quiz: ObjectId; score: number }[];
}

const UserRegistrationSchema = new Schema<UserRegistration>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  quizesCreated: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  quizesTaken: [
    {
      quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
      score: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});

UserRegistrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await hashPassword(this.password);
  next();
});

export const User = model<UserRegistration>("User", UserRegistrationSchema);
