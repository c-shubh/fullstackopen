import { faker } from "@faker-js/faker";
import Blog from "../models/blog";
import User from "../models/user";
import BlogToClient from "../types/BlogToClient";
import CreateBlogFromClient from "../types/CreateBlogFromClient";
import CreateUserFromClient from "../types/CreateUserFromClient";
import PopulatedBlogInUser from "../types/PopulatedBlogInUser";
import PopulatedUserInBlog from "../types/PopulatedUserInBlog";
import UserToClient from "../types/UserToClient";
import { NumberProperties } from "../types/utils";

// set authorId after creating a user
const initialBlogs: Omit<CreateBlogFromClient, "authorId">[] = [
  {
    title: "HTTP methods",
    url: "https://example.com",
  },
  {
    title: "Jill's first post",
    url: "https://example.com",
  },
  {
    title: "Testing Express.js backend",
    url: "https://example.com",
  },
];

const initialUsers: CreateUserFromClient[] = Array(3)
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

const blogsInDb = async (): Promise<BlogToClient[]> => {
  const populatedUserFields: NumberProperties<PopulatedUserInBlog> = {
    id: 1,
    name: 1,
    username: 1,
  };
  const blogs = await Blog.find({}).populate(
    "author",
    populatedUserFields,
    User
  );
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async (): Promise<UserToClient[]> => {
  const populatedBlogFields: NumberProperties<PopulatedBlogInUser> = {
    id: 1,
    likes: 1,
    title: 1,
    url: 1,
  };
  const users = await User.find({}).populate("blogs", populatedBlogFields);
  return users.map((user) => user.toJSON());
};

const newUserObject = (): CreateUserFromClient => ({
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
