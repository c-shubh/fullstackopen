import express from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../models/blog";
import User from "../models/user";
import CreateBlogToDb from "../types/CreateBlogToDb";
import { JwtToken } from "../types/CustomRequestData";
import PopulatedUserInBlog from "../types/PopulatedUserInBlog";
import { NumberProperties } from "../types/utils";
import { verifyJwt } from "../utils/auth";
import createBlogSchema from "../validation/createBlogSchema";
import updateBlogSchema from "../validation/updateBlogSchema";

const blogsRouter = express.Router();

const populatedUserFields: NumberProperties<PopulatedUserInBlog> = {
  id: 1,
  name: 1,
  username: 1,
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate(
    "author",
    populatedUserFields,
    User
  );
  response.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const customRequestData = req.custom as JwtToken;
  if (!customRequestData.token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Authorization bearer token required" });
  }
  try {
    // auth check
    const decodedToken = verifyJwt(customRequestData.token);
    if (!decodedToken.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "token invalid" });
    }

    // validation
    const blog = await createBlogSchema.validate(req.body);
    if (blog.authorId !== decodedToken.id) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid authorId (does not match with logged in user)",
      });
    }
    // find author
    const user = await User.findById(decodedToken.id);
    if (!user) throw new Error(`Author with id ${blog.authorId} not found`);
    // add author id to blog
    const { authorId, ...blogWithoutAuthorId } = blog;
    const blogWithAuthor: CreateBlogToDb = {
      ...blogWithoutAuthorId,
      author: authorId,
    };
    // insert blog in db
    const newBlog = new Blog(blogWithAuthor);
    const savedBlog = await newBlog.save();
    const populated = await savedBlog.populate({
      path: "author",
      select: populatedUserFields,
      model: User,
    });
    // add blog id to author
    user.blogs = user.blogs.concat(populated.id);
    await user.save();
    res.status(StatusCodes.CREATED).json(populated);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate(
      "author",
      populatedUserFields,
      User
    );
    if (blog) {
      response.json(blog);
    } else {
      response.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(StatusCodes.NO_CONTENT).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = await updateBlogSchema.validate(request.body);
  // the blog sent by user contains populated author,
  const { author, ...blogWithoutAuthor } = blog;
  // replace populated author to author id
  const blogToUpdate = {
    ...blogWithoutAuthor,
    author: author.id,
  };

  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: request.params.id },
      blogToUpdate,
      { new: true }
    ).populate("author", populatedUserFields, User);

    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

export default blogsRouter;
