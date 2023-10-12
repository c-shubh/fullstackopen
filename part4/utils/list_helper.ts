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

export default {
  dummy,
  totalLikes,
};
