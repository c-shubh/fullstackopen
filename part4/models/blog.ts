import mongoose from "mongoose";

export interface BlogT {
  title: string;
  author: string;
  url: string;
  likes: number;
}

const blogSchema = new mongoose.Schema<BlogT>({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
