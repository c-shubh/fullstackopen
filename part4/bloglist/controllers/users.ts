import express from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import CreateUserWithoutPasswordWithPasswordHash from "../types/CreateUserWithoutPasswordWithPasswordHash";
import { hashPassword } from "../utils/auth";
import createUserSchema from "../validation/createUserSchema";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUserSchema.validate(req.body);
    const { password, ...userWithoutPassword } = user;

    const passwordHash = await hashPassword(password);

    const userWithPasswordHash: CreateUserWithoutPasswordWithPasswordHash = {
      ...userWithoutPassword,
      passwordHash,
    };

    const newUser = new User(userWithPasswordHash);
    const savedUser = await newUser.save();

    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

export default usersRouter;
