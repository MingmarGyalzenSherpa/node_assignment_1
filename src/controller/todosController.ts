import { Request, Response } from "express";
import * as TodoServices from "../services/todoServices";

export const getTodos = (req: Request, res: Response) => {
  const data = TodoServices.getTodos();
  res.status(200).json(data);
};

export const getTodoById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.getTodoById(id);
  if (!data) {
    res.status(404).json({
      message: `User with id ${id} not found!`,
    });
  }

  res.status(200).json(data);
};
