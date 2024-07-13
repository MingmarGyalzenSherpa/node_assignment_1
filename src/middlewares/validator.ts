import { NextFunction, Response } from "express";
import { IExpressRequest as Request } from "../interfaces/IExpressRequest";
import { Schema } from "joi";
import { BadRequestError } from "../error/BadRequestError";

export const validateReqQuery =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);
    console.log(value);
    if (error) {
      next(new BadRequestError(error.message));
    }

    req.query = value;
    next();
  };

export const validateReqBody =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    console.log(value);
    if (error) {
      next(new BadRequestError(error.message));
    }

    next();
  };
