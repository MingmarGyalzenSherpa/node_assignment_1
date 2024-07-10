import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import * as AuthServices from "../services/authServices";
import * as messageGenerator from "../utils/messageGenerator";
import ResponseObject from "../utils/responseObject";

/**
 * Login a user
 *
 * @param req
 * @param res
 * @param next
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const data = await AuthServices.login(body);

    res
      .status(HttpStatusCodes.OK)
      .json(
        new ResponseObject<object>(messageGenerator.successful("Login"), [data])
      );
  } catch (error) {
    next(error);
  }
};

/**
 * This function is for refreshing the access token
 *
 * @param req
 * @param res
 * @param next
 */
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const data = AuthServices.refresh(refreshToken);

    res
      .status(HttpStatusCodes.OK)
      .json(
        new ResponseObject<object>(
          messageGenerator.successful("Token refresh"),
          [data]
        )
      );
  } catch (error) {
    next(error);
  }
};
