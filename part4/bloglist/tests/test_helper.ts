import Blog from "../models/blog";
import CreateBlog from "../types/CreateBlog";

const initialBlogs: CreateBlog[] = [
  {
    author: "Jack",
    title: "HTTP methods",
  },
  {
    author: "Jill",
    title: "Jill's first post",
  },
  {
    author: "Jake",
    title: "Testing Express.js backend",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
