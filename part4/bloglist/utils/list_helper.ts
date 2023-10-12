import _ from "lodash";
import { BlogT } from "../models/blog";

const dummy = (blogs: BlogT[]) => {
  blogs;
  return 1;
};

const totalLikes = (blogs: BlogT[]) => {
  let sum = 0;
  for (const blog of blogs) sum += blog.likes;
  return sum;
};

const favoriteBlog = (blogs: BlogT[]): BlogT | undefined => {
  let favIdx = 0;
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[favIdx].likes) {
      favIdx = i;
    }
  }
  return blogs[favIdx];
};

const mostBlogs = (blogs: BlogT[]) => {
  console.log(blogs);
  const result = _.chain(blogs)
    .countBy((blog) => blog.author)
    .toPairs()
    .maxBy((authorBlog) => authorBlog[1])
    .value();

  if (result === undefined) return undefined;

  return {
    author: result[0],
    blogs: result[1],
  };
};

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
