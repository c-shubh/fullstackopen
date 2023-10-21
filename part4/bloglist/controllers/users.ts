import express from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import CreateUserToDb from "../types/CreateUserToDb";
import PopulatedBlogInUser from "../types/PopulatedBlogInUser";
import { NumberProperties } from "../types/utils";
import { hashPassword } from "../utils/auth";
import createUserSchema from "../validation/createUserSchema";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const populatedBlogFields: NumberProperties<PopulatedBlogInUser> = {
    id: 1,
    likes: 1,
    title: 1,
    url: 1,
  };
  const users = await User.find({}).populate("blogs", populatedBlogFields);
  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUserSchema.validate(req.body);
    const { password, ...userWithoutPassword } = user;

    const passwordHash = await hashPassword(password);

    const userWithPasswordHash: CreateUserToDb = {
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
