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

export default {
  dummy,
  totalLikes,
  favoriteBlog,
};
