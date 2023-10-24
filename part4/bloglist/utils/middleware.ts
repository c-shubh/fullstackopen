import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { CastError } from "mongoose";
import HandleError from "../types/HandleError";
import MongoServerError from "../types/MongoServerError";
import logger from "./logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = error as Error;
  logger.error(err.message);

  switch (err.name) {
    case "CastError":
      handleCastError(req, res, next, error as CastError);
      break;
    case "ValidationError":
      handleValidationError(req, res, next, error as Error);
      break;
    case "MongoServerError":
      handleMongoServerError(req, res, next, error as any);
      break;
    case "JsonWebTokenError":
      handleJsonWebTokenError(req, res, next, error as JsonWebTokenError);
      break;
    case "TokenExpiredError":
      handleTokenExpiredError(req, res, next, error as TokenExpiredError);
      break;
  }

  next(err);
};

const handleCastError: HandleError<CastError> = (req, res, next, err) => {
  return res.status(StatusCodes.BAD_REQUEST).send({ error: "malformatted id" });
};

const handleValidationError: HandleError<Error> = (req, res, next, err) => {
  return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
};

const handleMongoServerError: HandleError<MongoServerError> = (
  req,
  res,
  next,
  err
) => {
  if (err.code === MongoServerError.DuplicateKeyError)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid username" });
};

const handleJsonWebTokenError: HandleError<JsonWebTokenError> = (
  req,
  res,
  next,
  err
) => {
  return res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message });
};

const handleTokenExpiredError: HandleError<TokenExpiredError> = (
  req,
  res,
  next,
  err
) => {
  return res.status(StatusCodes.UNAUTHORIZED).json({ error: "token expired" });
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
