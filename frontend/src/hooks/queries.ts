import { useMutation } from "@tanstack/react-query";

import { TUser } from "../pages/UserRegister";
import { createQuize, loginUser, registerUser } from "../api";
import { TUserLoginInfo } from "../pages/UserLogin";
import { QuizFormData } from "../pages/CreateQuiz";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: TUser) => registerUser(user),
  });
};

export const useCreateQuize = () => {
  return useMutation({
    mutationFn: (quiz: QuizFormData) => createQuize(quiz),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (user: TUserLoginInfo) => loginUser(user),
  });
};
