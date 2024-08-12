import * as z from "zod";

export const RegisterUserSchema = z.object({
  username: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  name: z
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
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  description: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  tag: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  level: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  category: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  numberOfQuestion: z
    .number({ required_error: "This field is required" })
    .min(1, "This field is required"),
  questions: z.array(
    z.object({
      question: z.string({ required_error: "This field is required" }),
      answerOptions: z.array(
        z.string({ required_error: "This field is required" })
      ),
      correctAnswer: z.string({ required_error: "This field is required" }),
      marks: z.number({ required_error: "This field is required" }),
    })
  ),
});
