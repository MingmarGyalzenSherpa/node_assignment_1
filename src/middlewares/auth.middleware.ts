import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config";
import IUserPayload from "../interfaces/IUserPayload";

/**
 * Middleware for authentication
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return {
      message: "Unauthenticated",
    };
  }

  const token = authorization.split(" ");

  if (token.length != 2 || token[0] != "Bearer") {
    return {
      message: "Unauthenticated",
    };
  }

  const isValidToken = verify(token[1], config.jwt.secret);

  if (!isValidToken) {
    next(new Error("Unauthenticated"));
  }

  const payload: IUserPayload = isValidToken as IUserPayload;
  req.headers.userId = payload.id;

  next();
};
