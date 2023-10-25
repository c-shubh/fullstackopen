import { afterAll, beforeEach, describe, expect, test } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import User from "../models/user";
import { comparePasswordAndHash } from "../utils/auth";
import helper from "./test_helper";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe("addition of a new user", () => {
  test("a valid user can be added", async () => {
    const newUser = helper.newUserObject();

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
    expect(response.body.username).toBe(newUser.username);
  });

  test("password is hashed and stored in the db", async () => {
    const newUser = helper.newUserObject();
    const response = await api.post("/api/users").send(newUser);

    const { id } = response.body;

    const userFromDb = await User.findById(id);
    expect(userFromDb).toBeDefined();
    if (userFromDb) {
      const isPasswordValid = await comparePasswordAndHash(
        newUser.password,
        userFromDb.passwordHash
      );
      expect(isPasswordValid).toBe(true);
    }
  });

  test("password is not returned when new user is created", async () => {
    const newUser = helper.newUserObject();
    const response = await api.post("/api/users").send(newUser);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("passwordHash");
  });

  test("invalid user is not added, respond with 400 Bad Request", async () => {
    const user = {
      username: "Jack",
    };

    await api.post("/api/users").send(user).expect(StatusCodes.BAD_REQUEST);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
  });

  test("new user created should be returned", async () => {
    const newUser = helper.newUserObject();
    const response = await api.post("/api/users").send(newUser);
    const { password, ...newUserWihoutPassword } = newUser;
    expect(response.body).toMatchObject(newUserWihoutPassword);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
