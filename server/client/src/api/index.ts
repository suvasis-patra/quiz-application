import { apiReaquest } from "../utils";
import { TUser } from "../pages/UserRegister";
import { TUserLoginInfo } from "../pages/UserLogin";
import { isAxiosError } from "axios";
import { QuizFormData } from "../pages/CreateQuiz";

export const registerUser = async (user: TUser) => {
  try {
    const response = await apiReaquest.post("/user/register", user);
    console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};

export const loginUser = async (user: TUserLoginInfo) => {
  try {
    const response = await apiReaquest.post("/user/login", user);
    console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiReaquest.get("user/current-user");
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};

export const logoutUser = async () => {};

export const createQuize = async (quiz: QuizFormData) => {
  try {
    const response = await apiReaquest.post("quiz/create-quiz", quiz);
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};

export const getQuizzes = async (
  category?: string,
  level?: string,
  tags?: string[]
) => {
  const queryParams = new URLSearchParams();
  if (level) {
    queryParams.append("level", level);
  }
  if (category) {
    queryParams.append("category", category);
  }
  if (tags && tags.length > 0) {
    tags.forEach((t) => queryParams.append("tag", t));
  }
  try {
    const response = await apiReaquest.get(`/quiz/all-quizzes?${queryParams}`);
    console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};

export const getLatestQuizzes = async () => {
  try {
    const response = await apiReaquest.get(`quiz/get-latest-quizzes`);
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getQuizById = async (quizId: string) => {
  try {
    const response = await apiReaquest.get(`quiz/get-quiz/${quizId}`);
    console.log(response?.data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const quizAnswers = async (answers: string[], quizId: string) => {
  try {
    const response = await apiReaquest.post(
      `quiz/check-quiz/${quizId}`,
      answers
    );
    console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      throw error;
    }
  }
};
