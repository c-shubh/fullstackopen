import { ObjectSchema, number, object, string } from "yup";
import UpdateBlog from "../types/UpdateBlog";

const updateBlogSchema: ObjectSchema<UpdateBlog> = object({
  id: string().required(),
  author: string().required(),
  title: string().required(),
  likes: number().required(),
  url: string().required(),
});

export default updateBlogSchema;
