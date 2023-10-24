import jwt from "jsonwebtoken";
interface JwtPayload extends jwt.JwtPayload {
  id: string;
  username: string;
}

export default JwtPayload;
