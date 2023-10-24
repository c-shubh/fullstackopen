import { ObjectSchema, object, string } from "yup";
import CreateUserFromClient from "../types/CreateUserFromClient";
import passwordSchema from "./passwordSchema";
import usernameSchema from "./usernameSchema";

const createUserSchema: ObjectSchema<CreateUserFromClient> = object({
  name: string().required("Name is required"),
  username: usernameSchema,
  password: passwordSchema,
});

export default createUserSchema;
