import { Request, Response } from "express";
import * as UserServices from "../services/userServices";

export const createUser = (req: Request, res: Response) => {
  const { body } = req;

  const data = UserServices.createUser(body);
  res.json(data);
};
