import { ObjectSchema, number, object, string } from "yup";
import CreateBlog from "../types/CreateBlog";

const createBlogSchema: ObjectSchema<CreateBlog> = object({
  author: string().required(),
  title: string().required(),
  likes: number().default(0),
  url: string().required(),
});

export default createBlogSchema;
