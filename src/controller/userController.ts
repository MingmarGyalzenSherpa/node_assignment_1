import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import * as UserServices from "../services/userServices";
import ResponseObject from "../utils/responseObject";

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await UserServices.createUser(body);

  res.json(data);
};

export const getAllUsers = (req: Request, res: Response) => {
  const data = UserServices.getAllUsers();
  res.status(HttpStatusCodes.OK).json({
    message: "User fetched successfully",
    data: data,
  });
};

export const getUserByEmail = (email: string) => {};
