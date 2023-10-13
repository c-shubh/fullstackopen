import express from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../models/blog";
import createBlogSchema from "../validation/createBlogSchema";
const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = await createBlogSchema.validate(request.body);

    const newBlog = new Blog(blog);
    const savedBlog = newBlog.save();

    response.status(StatusCodes.CREATED).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

export default blogsRouter;
