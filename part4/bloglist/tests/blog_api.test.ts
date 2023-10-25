import { afterAll, beforeEach, describe, expect, test } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Blog from "../models/blog";
import User from "../models/user";
import BlogT from "../types/Blog";
import BlogToClient from "../types/BlogToClient";
import CreateBlogFromClient from "../types/CreateBlogFromClient";
import CreateBlogToDb from "../types/CreateBlogToDb";
import JwtPayload from "../types/JwtPayload";
import UpdateBlogFromClient from "../types/UpdateBlogFromClient";
import helper from "./test_helper";

const api = supertest(app);
const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  // clear db
  await Blog.deleteMany({});
  await User.deleteMany({});
  const user = new User(helper.newUserObject());
  await user.save();

  const blogsFromClient = helper.initialBlogs;
  const blogsToDb = blogsFromClient.map((blog) => {
    const blogToDb: CreateBlogToDb = {
      ...blog,
      author: user.id,
    };
    return blogToDb;
  });

  const blogObjects = blogsToDb.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 5 * 1000);

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(StatusCodes.OK)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r: BlogT) => r.title);
    expect(titles).toContain("Testing Express.js backend");
  });

  test("updating a blog works", async () => {
    const allBlogs = await helper.blogsInDb();
    const blogToBeUpdated: UpdateBlogFromClient = allBlogs[0];
    blogToBeUpdated.likes += 10;

    const response = await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated);

    expect(response.body.likes).toBe(blogToBeUpdated.likes);
  });

  test("updating id of a blog is not allowed", async () => {
    const allBlogs = await helper.blogsInDb();
    allBlogs;
    const updatedId = {
      ...allBlogs[0],
      id: "someRandomIdHere",
    };

    const response = await api
      .put(`/api/blogs/${allBlogs[0].id}`)
      .send(updatedId);
    expect(response.body.id).not.toBe(updatedId.id);
  });
});

describe("addition of a new blog", () => {
  test("a valid blog can be added", async () => {
    const user = (await helper.usersInDb())[0];
    const newBlog: CreateBlogFromClient = {
      title: "async/await simplifies making async calls",
      authorId: user.id,
      url: "https://example.com",
    };

    const userForToken: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", helper.authorizationHeaderBody(userForToken))
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("async/await simplifies making async calls");
  });

  test("blog without title is not added", async () => {
    const blog = {
      author: "Jack",
    };

    const user = (await helper.usersInDb())[0];

    const userForToken: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", helper.authorizationHeaderBody(userForToken))
      .send(blog)
      .expect(StatusCodes.BAD_REQUEST);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if title or url is missing in request data, respond with 400 Bad Request", async () => {
    const newBlog = {
      author: "Jack",
    };

    const user = (await helper.usersInDb())[0];

    const userForToken: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", helper.authorizationHeaderBody(userForToken))
      .send(newBlog)
      .expect(StatusCodes.BAD_REQUEST);
  });

  test("likes property default to 0 if missing from the request", async () => {
    const user = (await helper.usersInDb())[0];
    const blogWithoutLikes: CreateBlogFromClient = {
      authorId: user.id,
      title: "What is the purpose of life?",
      url: "https://example.com",
    };

    const userForToken: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", helper.authorizationHeaderBody(userForToken))
      .send(blogWithoutLikes);
    expect(response.body.likes).toBe(0);
  });

  test("new blog created should be returned", async () => {
    const user = (await helper.usersInDb())[0];
    const newBlog: CreateBlogFromClient = {
      title: "Careful with async JS code",
      authorId: user.id,
      url: "https://example.com",
    };
    const { authorId, ...blogWithoutAuthorId } = newBlog;
    const blogReturned: Partial<BlogToClient> = {
      author: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
      ...blogWithoutAuthorId,
    };

    const userForToken: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    const response = await api
      .post("/api/blogs")
      .set("Authorization", helper.authorizationHeaderBody(userForToken))
      .send(newBlog);
    expect(response.body).toMatchObject(blogReturned);
  });
});

describe("viewing a specific blog", () => {
  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });
});

describe("deletion of a blog", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    const user = (await helper.usersInDb())[0];

    const userForToken: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", helper.authorizationHeaderBody(userForToken))
      .expect(StatusCodes.NO_CONTENT);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

test("unique identifier of blog post is named `id`", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.close();
});
