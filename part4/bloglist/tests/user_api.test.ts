import { afterAll, beforeEach, test } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import User from "../models/user";
import { comparePasswordAndHash } from "../utils/auth";
import helper from "./test_helper";

const api = supertest(app);
const initialUsers = helper.initialUsers;

beforeEach(async () => {
  await User.deleteMany({});

  const userObjects = helper.initialUsers.map((user) => new User(user));
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
});

// describe("when there is initially some users saved", () => {
//   test.skip("users are returned as json", async () => {
//     await api
//       .get("/api/users")
//       .expect(StatusCodes.OK)
//       .expect("Content-Type", /application\/json/);
//   });

//   test.skip("all users are returned", async () => {
//     const response = await api.get("/api/users");

//     expect(response.body).toHaveLength(initialUsers.length);
//   });

//   test.skip("a specific user is within the returned users", async () => {
//     const response = await api.get("/api/users");

//     const titles = response.body.map((r: UserT) => r.title);
//     expect(titles).toContain("Testing Express.js backend");
//   });

//   test.skip("updating a user works", async () => {
//     const allUsers = await helper.usersInDb();
//     const updatedLikes: UpdateUser = {
//       ...allUsers[0],
//       likes: allUsers[0].likes + 1,
//     };

//     const response = await api
//       .put(`/api/users/${updatedLikes.id}`)
//       .send(updatedLikes);

//     expect(response.body.likes).toBe(updatedLikes.likes);
//   });

//   test.skip("updating id of a user is not allowed", async () => {
//     const allUsers = await helper.usersInDb();
//     const updatedId = {
//       ...allUsers[0],
//       id: "someRandomIdHere",
//     };

//     const response = await api
//       .put(`/api/users/${allUsers[0].id}`)
//       .send(updatedId);
//     expect(response.body.id).not.toBe(updatedId.id);
//   });
// });

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

// describe("viewing a specific user", () => {
//   test.skip("a specific user can be viewed", async () => {
//     const usersAtStart = await helper.usersInDb();

//     const userToView = usersAtStart[0];

//     const resultUser = await api
//       .get(`/api/users/${userToView.id}`)
//       .expect(200)
//       .expect("Content-Type", /application\/json/);

//     expect(resultUser.body).toEqual(userToView);
//   });
// });

// describe("deletion of a user", () => {
//   test.skip("a user can be deleted", async () => {
//     const usersAtStart = await helper.usersInDb();
//     const userToDelete = usersAtStart[0];

//     await api
//       .delete(`/api/users/${userToDelete.id}`)
//       .expect(StatusCodes.NO_CONTENT);

//     const usersAtEnd = await helper.usersInDb();
//     expect(usersAtEnd).toHaveLength(helper.initialUsers.length - 1);

//     const titles = usersAtEnd.map((r) => r.title);
//     expect(titles).not.toContain(userToDelete.title);
//   });
// });

// test.skip("unique identifier of user is named `id`", async () => {
//   const response = await api.get("/api/users");
//   expect(response.body[0].id).toBeDefined();
// });

afterAll(async () => {
  await mongoose.connection.close();
});
