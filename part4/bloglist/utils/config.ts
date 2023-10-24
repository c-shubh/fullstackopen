import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI =
  NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export default {
  MONGODB_URI,
  PORT,
  NODE_ENV,
  JWT_SECRET,
};
