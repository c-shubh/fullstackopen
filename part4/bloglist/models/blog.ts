import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
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
