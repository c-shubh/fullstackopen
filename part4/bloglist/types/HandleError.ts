import { NextFunction, Request, Response } from "express";

type HandleError<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: T
) => void;
export default HandleError;
