import * as z from "zod";

export const RegisterUserSchema = z.object({
  username: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  fullName: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .max(32, "name is too long"),
  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a vaild email"),
  confirmPassword: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
});

export const LoginUserSchema = z.object({
  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .min(8, "password is too short"),
  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required")
    .email("Enter a vaild email"),
});

export const CreateQuizSchema = z.object({
  title: z
    .string({ required_error: "Title is required!" })
    .min(1, "Title is required!"),
  description: z
    .string({ required_error: "Description is required!" })
    .min(1, "Description is required!"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required"),
  tag: z
    .string({ required_error: "Tag is required!" })
    .min(1, "Tag is required!"),
  level: z.enum(["easy", "medium", "hard"], {
    errorMap: () => ({ message: "Level is required" }),
  }),
  questions: z
    .array(
      z.object({
        question: z
          .string({ required_error: "Question is required!" })
          .min(1, "Question is required!"),
        answerOptions: z
          .array(
            z
              .string({ required_error: "Option is required!" })
              .min(1, "Option is required!")
          )
          .length(4, "There must be exactly 4 options!"),
        correctAnswer: z
          .string({ required_error: "This field is required!" })
          .min(1, "Correct answer is required"),
        marks: z.number().min(1, "Marks should be at least 1"),
      })
    )
    .min(1, { message: "There must be at least one question!" }),
});

export const PlayQuizSchema = z.array(z.string().min(1, "Answer is required"));
