import { Request, Response } from "express";
import * as TodoServices from "../services/todoServices";
export const getTodos = (req: Request, res: Response) => {
  console.log("hey");
  const data = TodoServices.getTodos();
  res.status(200).json(data);
};
