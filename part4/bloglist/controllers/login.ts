import express from "express";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";
import JwtPayload from "../types/JwtPayload";
import { comparePasswordAndHash, signJwt } from "../utils/auth";
import loginUserSchema from "../validation/loginUserSchema";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const loginCredentials = await loginUserSchema.validate(req.body);

    const { username, password } = loginCredentials;

    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null
        ? false
        : await comparePasswordAndHash(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "invalid username or password",
      });
    }

    const userForToken: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    const token = signJwt(userForToken);

    res
      .status(StatusCodes.OK)
      .send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

export default loginRouter;
