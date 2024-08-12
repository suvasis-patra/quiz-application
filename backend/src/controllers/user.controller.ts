import { Request, Response } from "express";

import { User } from "../models/user.model";
import { comparePassword, generateToken } from "../utils/index";
import { LoginUserSchema, RegisterUserSchema } from "../utils/validation";

export async function registerUser(req: Request, res: Response) {
  try {
    // extract the user information from request
    const userData = req.body;
    // validate user information
    const validatedFields = RegisterUserSchema.safeParse(userData);
    if (!validatedFields.success) {
      return res.status(401).send({ message: validatedFields.error });
    }
    const { username, email, password, name, confirmPassword } =
      validatedFields.data;
    // check password and confirm password are same
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "password not matched!" });
    }
    // check user already exist or not
    const exitstingUser = await User.findOne({ email });
    if (exitstingUser) {
      return res.status(400).send({ message: "email already exists!" });
    }

    // create new user and save to db
    const user = new User({
      username,
      name,
      email,
      password,
    });
    await user.save();
    // return response on successful user creation
    return res.status(201).send("success");
  } catch (error) {
    console.log("ERROR REGISTERING USER:", error);
    if (error instanceof Error) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    // extract the user data
    const validatedFields = LoginUserSchema.safeParse(req.body);
    // validate the data
    if (!validatedFields.success) {
      throw new Error("Invalid credentials");
    }
    // check the email exist or not
    const { email, password } = validatedFields.data;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("Invalid credentials");
    }
    // check the password
    const isPasswordCorrect = comparePassword(password, findUser.password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
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
      .send({ message: "successfully logged in!", token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: "Failed to log in" });
    }
    return res.status(500).send({ message: "Internal server error" });
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    // get the user id from headers
    const userId = req.headers.userId;
    // find the user based on id
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Failed to get user!");
    }
    // return the user
    return res.status(200).send({ message: "User found", user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: "Failed to log in" });
    }
    return res.status(500).send({ message: "Internal server error" });
  }
}

export function logoutUser(_: Request, res: Response) {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .send({ message: "logged out!" });
}
