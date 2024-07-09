import { Request, Response } from "express";
import * as UserServices from "../services/userServices";

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const data = await UserServices.createUser(body);
  res.json(data);
};

export const getUserByEmil = (email:string)=>{
  
}
