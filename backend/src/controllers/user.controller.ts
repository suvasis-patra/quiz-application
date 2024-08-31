import { Request, Response } from "express";

import { ERROR_CODE } from "../constant";
import { User } from "../models/user.model";
import { ApiError } from "../utils/errorResponse";
import { ApiResponse } from "../utils/apiResponse";
import { comparePassword, generateToken } from "../utils/index";
import { LoginUserSchema, RegisterUserSchema } from "../utils/validation";

export async function registerUser(req: Request, res: Response) {
  try {
    // extract the user information from request
    const userData = req.body;
    // validate user information
    const validatedFields = RegisterUserSchema.safeParse(userData);
    if (!validatedFields.success) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            validatedFields.error.message,
            ERROR_CODE.INVALID_FORMAT
          )
        );
    }
    const { username, email, password, fullName, confirmPassword } =
      validatedFields.data;
    // check user already exist or not
    const exitstingUser = await User.findOne({ email });
    if (exitstingUser) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Email already exist!", ERROR_CODE.DUPLICATE_USER)
        );
    }

    // create new user and save to db
    const user = new User({
      username,
      fullName,
      email,
      password,
    });
    await user.save();
    // return response on successful user creation
    return res
      .status(201)
      .json(
        new ApiResponse(201, { userId: user._id }, "registered successfully!")
      );
  } catch (error) {
    console.log("ERROR REGISTERING USER:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal server error!", ERROR_CODE.SERVER_ERROR)
      );
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    // extract the user data
    const validatedFields = LoginUserSchema.safeParse(req.body);
    // validate the data
    if (!validatedFields.success) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            validatedFields.error.message,
            ERROR_CODE.INVALID_FORMAT
          )
        );
    }
    // check the email exist or not
    const { email, password } = validatedFields.data;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Invalid credentials!",
            ERROR_CODE.INVALID_CREDENTIALS
          )
        );
    }
    // check the password
    const isPasswordCorrect = comparePassword(password, findUser.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Invalid credentials!",
            ERROR_CODE.INVALID_CREDENTIALS
          )
        );
    }
    // generate access token
    const token = generateToken({ user_id: findUser._id });
    // store it in users browser cookies
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(
        new ApiResponse(
          200,
          {
            token,
            userId: findUser._id,
            role: findUser.role,
            username: findUser.username,
          },
          "logged in!"
        )
      );
  } catch (error) {
    console.log("ERROR LOGGING IN USER:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal server error!", ERROR_CODE.SERVER_ERROR)
      );
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    // get the user id from headers
    const userId = req.headers.userId;
    // find the user based on id
    const user = await User.findById(userId)
      .select("-password") // Exclude the password field from the result
      .populate({
        path: "quizesCreated",
        select: "-questions.correctAnswer", // Exclude correctAnswer from quizesCreated
      })
      .populate({
        path: "quizesTaken.quiz",
        select: "-questions.correctAnswer", // Exclude correctAnswer from quizesTaken
      });
    if (!user) {
      return res
        .status(401)
        .json(
          new ApiError(401, "User not found!", ERROR_CODE.UNAUTHORIZED_USER)
        );
    }
    // return the user
    return res.status(200).json(new ApiResponse(200, user, "Found user!"));
  } catch (error) {
    console.log("ERROR GETTING USER:", error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Internal server error!",
          ERROR_CODE.UNAUTHORIZED_USER
        )
      );
  }
}

export function logoutUser(_: Request, res: Response) {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(204)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(204, {}));
}
