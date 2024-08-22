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

export const getQuiz = async () => {
  try {
    const response = await apiReaquest.get("/quiz/all-quizes");
    console.log(response.data);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
