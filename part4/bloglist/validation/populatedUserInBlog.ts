import { ObjectSchema, object, string } from "yup";
import PopulatedUserInBlog from "../types/PopulatedUserInBlog";

const populatedUserInBlog: ObjectSchema<PopulatedUserInBlog> = object({
  id: string().required(),
  name: string().required(),
  username: string().required(),
});

export default populatedUserInBlog;
