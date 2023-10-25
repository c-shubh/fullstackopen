import express from "express";
import { StatusCodes } from "http-status-codes";
import Blog from "../models/blog";
import User from "../models/user";
import CreateBlogToDb from "../types/CreateBlogToDb";
import { User as UserInRequest } from "../types/CustomRequestData";
import PopulatedUserInBlog from "../types/PopulatedUserInBlog";
import { NumberProperties } from "../types/utils";
import middleware from "../utils/middleware";
import createBlogSchema from "../validation/createBlogSchema";
import updateBlogSchema from "../validation/updateBlogSchema";

const blogsRouter = express.Router();

const populatedUserFields: NumberProperties<PopulatedUserInBlog> = {
  id: 1,
  name: 1,
  username: 1,
};

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate(
    "author",
    populatedUserFields,
    User
  );
  return res.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  const customRequestData = req.custom as UserInRequest;
  try {
    // validation
    const blog = await createBlogSchema.validate(req.body);
    if (blog.authorId !== customRequestData.user.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid authorId (does not match with logged in user)",
      });
    }
    const user = customRequestData.user;
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
    return res.status(StatusCodes.CREATED).json(populated);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      populatedUserFields,
      User
    );
    if (blog) {
      return res.json(blog);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", middleware.userExtractor, async (req, res, next) => {
  const customRequestData = req.custom as UserInRequest;
  try {
    // get the blog
    const blogToDelete = await Blog.findById(req.params.id);
    if (!blogToDelete) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Blog does not exist" });
    }
    if (blogToDelete.author.toString() !== customRequestData.user.id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "You're not authorized to delete this blog." });
    }
    await Blog.findByIdAndRemove(req.params.id);
    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const blog = await updateBlogSchema.validate(req.body);
  // the blog sent by user contains populated author,
  const { author, ...blogWithoutAuthor } = blog;
  // replace populated author to author id
  const blogToUpdate = {
    ...blogWithoutAuthor,
    author: author.id,
  };

  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      blogToUpdate,
      { new: true }
    ).populate("author", populatedUserFields, User);

    return res.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

export default blogsRouter;
