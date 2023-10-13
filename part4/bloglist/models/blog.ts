import mongoose from "mongoose";
import BlogT from "../types/Blog";

const blogSchema = new mongoose.Schema<BlogT>({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
