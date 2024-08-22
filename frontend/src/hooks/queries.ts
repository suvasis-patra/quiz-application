import { useMutation, useQuery } from "@tanstack/react-query";

import { useFilter } from "./filters";
import { TUser } from "../pages/UserRegister";
import { QUERY_KEYS } from "../utils/constant";
import { QuizFormData } from "../pages/CreateQuiz";
import { TUserLoginInfo } from "../pages/UserLogin";
import { createQuize, getQuizzes, loginUser, registerUser } from "../api";

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

export const useGetQuizzes = () => {
  const { category, level, tags } = useFilter();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_QUIZZES, category, level, tags],
    queryFn: () => getQuizzes(category, level, tags),
  });
};
