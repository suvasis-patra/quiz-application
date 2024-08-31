import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errorResponse";
import { ERROR_CODE } from "../constant";

export async function undefinedRoute(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const err = new ApiError(404, "Page not found!", ERROR_CODE.PAGE_NOT_FOUND);
  next(err);
}

export async function handleError(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(err.statusCode || 500)
    .json(new ApiError(err.statusCode, err.message, err.errorCode));
}
