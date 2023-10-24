import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import blogsRouter from "./controllers/blogs";
import loginRouter from "./controllers/login";
import usersRouter from "./controllers/users";
import config from "./utils/config";
import logger from "./utils/logger";
import middleware from "./utils/middleware";
const app = express();

mongoose.set("strictQuery", false);
logger.info("connecting to MongoDB");
mongoose
  .connect(config.MONGODB_URI!)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
