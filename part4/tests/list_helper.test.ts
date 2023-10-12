import { describe, expect, test } from "@jest/globals";
import { BlogT } from "../models/blog";
import listHelper from "../utils/list_helper";

describe("list helper", () => {
  test("dummy returns one", () => {
    const blogs: BlogT[] = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});
