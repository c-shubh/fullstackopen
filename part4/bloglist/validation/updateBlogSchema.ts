import { ObjectSchema, number, object, string } from "yup";
import UpdateBlogFromClient from "../types/UpdateBlogFromClient";
import populatedUserInBlog from "./populatedUserInBlog";

const updateBlogSchema: ObjectSchema<UpdateBlogFromClient> = object({
  id: string().required(),
  author: populatedUserInBlog,
  title: string().required(),
  likes: number().required(),
  url: string().required(),
});

export default updateBlogSchema;
