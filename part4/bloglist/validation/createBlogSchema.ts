import { ObjectSchema, object, string } from "yup";
import CreateBlog from "../types/CreateBlog";

const createBlogSchema: ObjectSchema<CreateBlog> = object({
  author: string().required(),
  title: string().required(),
});

export default createBlogSchema;
