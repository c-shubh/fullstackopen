import { afterAll, beforeEach, test } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import Blog from "../models/blog";
import BlogT from "../types/Blog";
import CreateBlog from "../types/CreateBlog";
import helper from "./test_helper";

const api = supertest(app);
const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some notes saved", () => {
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
});

describe("addition of a new note", () => {
  test("a valid blog can be added", async () => {
    const newBlog: CreateBlog = {
      title: "async/await simplifies making async calls",
      author: "Jack",
      url: "https://example.com",
    };

    await api
      .post("/api/blogs")
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

    await api.post("/api/blogs").send(blog).expect(StatusCodes.BAD_REQUEST);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("if title or url is missing in request data, respond with 400 Bad Request", async () => {
    const newBlog = {
      author: "Jack",
    };
    await api.post("/api/blogs").send(newBlog).expect(StatusCodes.BAD_REQUEST);
  });

  test("likes property default to 0 if missing from the request", async () => {
    const blogWithoutLikes: CreateBlog = {
      author: "Jack",
      title: "What is the purpose of life?",
      url: "https://example.com",
    };
    const response = await api.post("/api/blogs").send(blogWithoutLikes);
    expect(response.body.likes).toBe(0);
  });

  test("new blog created should be returned", async () => {
    const newBlog: CreateBlog = {
      title: "Careful with async JS code",
      author: "Jack",
      url: "https://example.com",
    };
    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body).toMatchObject(newBlog);
  });
});

describe("viewing a specific note", () => {
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

describe("deletion of a note", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
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
