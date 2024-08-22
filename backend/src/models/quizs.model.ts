import { Document, model, ObjectId, Schema } from "mongoose";

export interface QuizSchema extends Document {
  _id: ObjectId;
  title: string;
  description: string;
  tag: string[];
  level: string;
  numberOfQuestion: number;
  category: string;
  questions: {
    question: string;
    answerOptions: string[];
    correctAnswer: string;
    marks: number;
  }[];
}

const quizModel = new Schema<QuizSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: [String],
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberOfQuestion: {
      type: Number,
      required: true,
    },
    questions: [
      {
        question: String,
        answerOptions: [String],
        correctAnswer: String,
        marks: Number,
      },
    ],
  },
  { timestamps: true }
);

const Quiz = model("Quiz", quizModel);

export { Quiz };
