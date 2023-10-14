import mongoose from "mongoose";
import BlogT from "../types/Blog";

const blogSchema = new mongoose.Schema<BlogT>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set("toJSON", {
  // add `id`
  virtuals: true,
  // remove `__v`
  versionKey: false,
  transform(doc, ret) {
    // remove `_id`
    delete ret._id;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
