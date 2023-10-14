import Blog from "../models/blog";
import BlogT from "../types/Blog";
import CreateBlog from "../types/CreateBlog";

const initialBlogs: CreateBlog[] = [
  {
    author: "Jack",
    title: "HTTP methods",
    url: "https://example.com",
  },
  {
    author: "Jill",
    title: "Jill's first post",
    url: "https://example.com",
  },
  {
    author: "Jake",
    title: "Testing Express.js backend",
    url: "https://example.com",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async (): Promise<BlogT[]> => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
