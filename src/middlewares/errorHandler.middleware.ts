import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../error/UnAuthorizedError";
import { ForbiddenError } from "../error/ForbiddenError";

export const notFound = (req: Request, res: Response) => {
  res.status(HttpStatusCodes.NOT_FOUND).json({
    message: "NOT FOUND",
  });
};

export const genericErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");

  //unauthorized error
  if (err instanceof UnAuthorizedError) {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: err.message,
    });
  }

  //forbidden error
  if (err instanceof ForbiddenError) {
    res.status(HttpStatusCodes.FORBIDDEN).json({
      message: err.message,
    });
  }

  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
};
