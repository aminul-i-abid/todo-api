import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const logError = {
    url: req.originalUrl,
    method: req.method,
    statusCode: err.statusCode,
    message: err.message,
    stack: err.stack
  };

  if (process.env.NODE_ENV === "development") {
    logger.error("Request failed", logError);
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production mode: don't leak error details
    if (err.isOperational) {
      logger.error("Operational error", { ...logError, stack: undefined });
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Programming or unknown errors: don't leak error details
      logger.error("Unexpected error", logError);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
