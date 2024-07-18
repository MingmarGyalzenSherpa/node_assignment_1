import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UnAuthorizedError } from "../error/UnAuthorizedError";
import { ForbiddenError } from "../error/ForbiddenError";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";

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
  //unauthorized error
  console.log(err);
  if (err instanceof UnAuthorizedError) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      message: err.message,
    });
  }

  //forbidden error
  if (err instanceof ForbiddenError) {
    return res.status(HttpStatusCodes.FORBIDDEN).json({
      message: err.message,
    });
  }

  //Bad request error
  if (err instanceof BadRequestError) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      message: err.message,
    });
  }

  return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
};
