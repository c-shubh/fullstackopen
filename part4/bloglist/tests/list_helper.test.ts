import { describe, expect, test } from "@jest/globals";
import BlogT from "../types/Blog";
import listHelper from "../utils/list_helper";

const noBlogs: BlogT[] = [];
const oneBlog = [
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];
const manyBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

test("dummy returns one", () => {
  const blogs: BlogT[] = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(noBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(manyBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("of empty list is undefined", () => {
    const result = listHelper.favoriteBlog(noBlogs);
    expect(result).toBe(undefined);
  });

  test("when list has only one blog", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    expect(result).toEqual(oneBlog[0]);
  });

  test("when the list has many blogs", () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    expect(result).toEqual(manyBlogs[2]);
  });
});

describe("author with most blogs", () => {
  test("among no blogs should be undefined", () => {
    const result = listHelper.mostBlogs(noBlogs);
    expect(result).toBe(undefined);
  });

  test("among one blog should be that one blog's author", () => {
    const result = listHelper.mostBlogs(oneBlog);
    expect(result).toEqual({
      author: oneBlog[0].author,
      blogs: 1,
    });
  });

  test("among many blogs", () => {
    const result = listHelper.mostBlogs(manyBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("author with most likes", () => {
  test("among no blogs should be undefined", () => {
    const result = listHelper.mostLikes(noBlogs);
    expect(result).toBe(undefined);
  });

  test("among one blog should be that one blog's author and likes", () => {
    const result = listHelper.mostLikes(oneBlog);
    expect(result).toEqual({
      author: oneBlog[0].author,
      likes: oneBlog[0].likes,
    });
  });

  test("among many blogs", () => {
    const result = listHelper.mostLikes(manyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
