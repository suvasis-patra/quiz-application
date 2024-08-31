import { Request, Response } from "express";

import { ERROR_CODE } from "../constant";
import { User } from "../models/user.model";
import { ApiError } from "../utils/errorResponse";
import { ApiResponse } from "../utils/apiResponse";
import { Quiz } from "../models/quizs.model";
import { CreateQuizSchema, PlayQuizSchema } from "../utils/validation";

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
      return res.status(404).json(new ApiError(404, "Quiz not found!", 300));
    }

    const quizWithoutAnswer = quiz.toObject();
    const questionsWithoutAnswer = quizWithoutAnswer.questions.map(
      (question) => {
        const { correctAnswer, ...questionsWithoutAnswer } = question;
        return questionsWithoutAnswer;
      }
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { questionsWithoutAnswer, title: quiz.title },
          "Got quiz!"
        )
      );
  } catch (error) {
    console.log("ERROR GETTING QUIZ BY ID: ", error);
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
    const userId = req.headers.userId as string;
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
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { quizesCreated: quiz._id },
      },
      { new: true }
    );
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

export async function checkQuiz(req: Request, res: Response) {
  const { quizId } = req.params;
  const userId = req.headers.userId as string;

  const validatedFields = PlayQuizSchema.safeParse(req.body);
  if (!validatedFields.success) {
    return res
      .status(400)
      .json(
        new ApiError(
          401,
          validatedFields.error.message,
          ERROR_CODE.INVALID_FORMAT
        )
      );
  }

  const answers = validatedFields.data;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json(new ApiError(404, "Quiz not found!", 300));
    }

    let score = 0;
    let totalScore = 0;

    const feedback = quiz.questions.map((question, index) => {
      const isAnswerCorrect = question.correctAnswer === answers[index];
      if (isAnswerCorrect) {
        score += question.marks;
      }
      totalScore += question.marks;
      return {
        isAnswerCorrect,
        question: question.question,
        correctAnswer: question.correctAnswer,
        givenAnswer: answers[index],
      };
    });

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(new ApiError(404, "User not found!", 301));
    }

    const quizTakenIndex = user.quizesTaken.findIndex(
      (el) => el.quiz === quiz._id
    );
    if (quizTakenIndex !== -1) {
      user.quizesTaken[quizTakenIndex].score = score;
    } else {
      user.quizesTaken.push({ quiz: quiz._id, score });
    }

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, { feedback, totalScore, score }));
  } catch (error) {
    console.error("ERROR CHECKING QUIZ: ", error);
    return res
      .status(500)
      .send(
        new ApiError(500, "Internal server error!", ERROR_CODE.SERVER_ERROR)
      );
  }
}

export async function latestQuizzes(_: Request, res: Response) {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 }).limit(5);

    return res
      .status(200)
      .json(
        new ApiResponse(200, quizzes, "Latest quizzes fetched successfully!")
      );
  } catch (error) {
    console.error("ERROR FETCHING LATEST QUIZZES:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal server error!", ERROR_CODE.SERVER_ERROR)
      );
  }
}
