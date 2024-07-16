import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import { verify } from "jsonwebtoken";
import { config } from "../config";
import IUser from "../interfaces/IUser";
import { permissions } from "../constants/permissions";
import { ForbiddenError } from "../error/ForbiddenError";
import { UnAuthorizedError } from "../error/UnAuthorizedError";

/**
 * Middleware for authentication
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnAuthorizedError("Unauthorized access"));
  }

  const token = authorization.split(" ");

  if (token.length != 2 || token[0] !== "Bearer") {
    next(new UnAuthorizedError("Unauthorized access"));
  }
  try {
    const user = verify(token[1], config.jwt.secret) as IUser;

    req.user = user;
  } catch (error) {
    next(new UnAuthorizedError("Unauthorized access"));
  }

  next();
};

export const authorization =
  (permission: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const userRole = user.role;
    console.log(userRole);
    const userPermissions = permissions[userRole];
    if (!userPermissions.includes(permission)) {
      next(new ForbiddenError("Access denied"));
    }

    next();
  };
