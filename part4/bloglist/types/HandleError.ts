import { NextFunction, Request, Response } from "express";

type HandleError<T> = (
  req: Request,
  ers: Response,
  next: NextFunction,
  err: T
) => void;
export default HandleError;
