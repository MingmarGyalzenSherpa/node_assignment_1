import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import { JwtPayload, verify } from "jsonwebtoken";
import { config } from "../config";
import IUser from "../interfaces/IUser";
import { permissions } from "../constants/permissions";

/**
 * Middleware for authentication
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("Unauthenticated"));
  }

  const token = authorization.split(" ");

  if (token.length != 2 || token[0] != "Bearer") {
    next(new Error("Unauthenticated"));
  }

  const user = verify(token[1], config.jwt.secret) as IUser;

  if (!user) {
    next(new Error("Unauthenticated"));
  }
  console.log(user);
  req.user = user;
  next();
};

export const authorization =
  (permission: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const userRole = user.role;
    const userPermissions = permissions[userRole];
    console.log(permissions[userRole]);
    console.log(permission);
    if (!userPermissions.includes(permission)) {
      next(new Error("no permission"));
    }

    next();
  };
