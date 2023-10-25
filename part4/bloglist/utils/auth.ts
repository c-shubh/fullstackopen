import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import JwtPayload from "../types/JwtPayload";
import config from "./config";
import logger from "./logger";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash;
  } catch (err) {
    logger.error("Error while hashing password: ", err);
    throw new Error("Password hashing failed");
  }
}

export async function comparePasswordAndHash(
  password: string,
  passwordHash: string
): Promise<boolean> {
  try {
    const passwordsMatch = await bcrypt.compare(password, passwordHash);
    return passwordsMatch;
  } catch (error) {
    logger.error("Error while comparing password and hash:", error);
    throw new Error("Password comparison failed");
  }
}

export function signJwt(payload: string | object | Buffer) {
  return jwt.sign(payload, config.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export function getTokenFrom(req: Request) {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}

export function verifyJwt(token: string | null) {
  // throws JsonWebTokenError when token is null
  return jwt.verify(token!, config.JWT_SECRET!) as JwtPayload;
}
