class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errorCode: number;
  errors: string[];
  constructor(
    statusCode: number,
    message = "Something went wrong",
    errorCode: number,
    errors: string[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errorCode = errorCode;
    this.success = false;
    this.errors = errors.length > 0 ? errors : [message];
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
