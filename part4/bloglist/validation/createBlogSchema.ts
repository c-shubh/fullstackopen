import { ObjectSchema, number, object, string } from "yup";
import CreateBlogFromClient from "../types/CreateBlogFromClient";

const createBlogSchema: ObjectSchema<CreateBlogFromClient> = object({
  authorId: string().required(),
  title: string().required(),
  likes: number().default(0),
  url: string().required(),
});

export default createBlogSchema;
