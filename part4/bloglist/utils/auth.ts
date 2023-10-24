import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  return jwt.sign(payload, config.JWT_SECRET!);
}
