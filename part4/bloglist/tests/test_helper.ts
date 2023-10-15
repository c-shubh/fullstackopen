import { faker } from "@faker-js/faker";
import Blog from "../models/blog";
import User from "../models/user";
import BlogT from "../types/Blog";
import CreateBlog from "../types/CreateBlog";
import CreateUser from "../types/CreateUser";
import UserT from "../types/User";

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

const initialUsers: CreateUser[] = Array(3)
  .fill(0)
  .map((_) => ({
    name: faker.person.firstName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }));

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

const usersInDb = async (): Promise<UserT[]> => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const newUserObject = (): CreateUser => ({
  name: faker.person.firstName(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

export default {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
  newUserObject,
};
