import { ObjectSchema, object, string } from "yup";
import CreateUser from "../types/CreateUser";

const createUserSchema: ObjectSchema<CreateUser> = object({
  name: string().required(),
  username: string().required(),
  password: string().required(),
});

export default createUserSchema;
