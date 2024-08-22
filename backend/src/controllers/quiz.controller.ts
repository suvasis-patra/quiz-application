import { Quiz } from "../models/quizs.model";
import { Request, Response } from "express";
import { CreateQuizSchema } from "../utils/validation";
import { ApiError } from "../utils/errorResponse";
import { ERROR_CODE } from "../constant";
import { ApiResponse } from "../utils/apiResponse";

interface Filters {
  level?: string;
  category?: string[];
  tag?: string[];
}

// export async function getAllQuizes(_: Request, res: Response) {
//   try {
//     const quizes = await Quiz.find().select("-questions");
//     if (!quizes) {
//       throw new Error("Failed to get quizes");
//     }
//     return res.status(200).send(quizes);
//   } catch (error) {
//     console.log("ERROR IN GETTING QUIZES:", error);
//     if (error instanceof Error) {
//       return res.status(400).send({ message: "Failed to get quizes" });
//     }
//     return res.status(500).send({ message: "Internal server error!" });
//   }
// }

export async function getQuizById(req: Request, res: Response) {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found!" });
    }

    const quizWithoutAnswer = quiz.toObject();
    const questionsWithoutAnswer = quizWithoutAnswer.questions.map(
      (question) => {
        const { correctAnswer, ...questionsWithoutAnswer } = question;
        return questionsWithoutAnswer;
      }
    );
    return res.status(200).send(questionsWithoutAnswer);
  } catch (error) {
    console.log("ERROR GETTING QUIZ BY ID: ", error);
    return res.status(500).send({ message: "Internal server error!" });
  }
}

export async function getQuizByFiltration(req: Request, res: Response) {
  //   const { level, tag, category } = req.query;

  try {
    const level = req.query.level as string | undefined;
    const category = req.query.category as string | string[] | undefined;
    const tag = req.query.tag as string | string[] | undefined;
    console.log(tag, level, category);
    let filters: Filters = {};

    if (level) {
      filters.level = level;
    }

    if (category) {
      filters.category = Array.isArray(category) ? category : [category];
    }

    if (tag) {
      filters.tag = Array.isArray(tag) ? tag : [tag];
    }

    const quizs = await Quiz.find({
      ...filters,
      ...(filters.category && { category: { $in: filters.category } }),
      ...(filters.level && { level: { $in: filters.level } }),
    }).select("-questions");

    if (!quizs.length) {
      return res.status(404).send({ message: "No quiz found!" });
    }
    return res.status(200).send(quizs);
  } catch (error) {
    console.log("ERROR GETTING QUIZ BY FILTERS: ", error);
    return res.status(500).send({ message: "Internal server error!" });
  }
}

export async function createQuiz(req: Request, res: Response) {
  try {
    const validatedFields = CreateQuizSchema.safeParse(req.body);
    if (!validatedFields.success) {
      return res
        .status(409)
        .json(new ApiError(409, "Invalid data!", ERROR_CODE.INVALID_FORMAT));
    }
    const quiz = await Quiz.create({
      ...validatedFields.data,
      tag: validatedFields.data.tag.split(","),
      numberOfQuestion: validatedFields.data.questions.length,
    });
    if (!quiz) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Failed to create quiz!",
            ERROR_CODE.DATABASE_INSTANCE
          )
        );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, { quizId: quiz._id }, "Quiz created!"));
  } catch (error) {
    console.log("ERROR CREATING QUIZ: ", error);
    return res
      .status(500)
      .send(
        new ApiError(500, "Internal server error!", ERROR_CODE.SERVER_ERROR)
      );
  }
}
