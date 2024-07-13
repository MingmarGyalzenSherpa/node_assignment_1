import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import * as UserServices from "../services/userServices";
import { BadRequestError } from "../error/BadRequestError";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const data = await UserServices.createUser(body);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = (req: Request, res: Response) => {
  const { query } = req;
  const data = UserServices.getAllUsers(query);
  res.status(HttpStatusCodes.OK).json({
    message: "User fetched successfully",
    data: data,
  });
};

export const getUserById = (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const data = UserServices.getUserById(userId);

    res.status(HttpStatusCodes.OK).json({
      message: "User fetched successfully",
      data: [data],
    });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 *  Update a user by id
 * @param req
 * @param res
 * @param next
 */
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.params;
    const { body: updatedUser } = req;

    const user = UserServices.updateUser(userId, updatedUser);

    res.status(HttpStatusCodes.OK).json({
      message: "User updated successfully",
      data: [user],
    });
  } catch (error) {
    console.log("error ayo");
    next(new BadRequestError(error.message));
  }
};

/**
 * Delete a user by id
 * @param req
 * @param res
 * @param next
 */
export const deleteUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params;

    const data = UserServices.deleteUserById(userId);

    res.status(HttpStatusCodes.OK).json({
      message: "User deleted successfully",
      data: [data],
    });
  } catch (error) {
    next(error);
  }
};
