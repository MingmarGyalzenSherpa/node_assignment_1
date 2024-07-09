import { Request, Response } from "express";
import * as AuthServices from "../services/authServices";

export const login = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await AuthServices.login(body);
  res.json(data);
};
