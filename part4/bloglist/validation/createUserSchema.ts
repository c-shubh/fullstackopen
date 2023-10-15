import { ObjectSchema, object, string } from "yup";
import CreateUser from "../types/CreateUser";

const createUserSchema: ObjectSchema<CreateUser> = object({
  name: string().required("Name is required"),
  username: string()
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"),
  password: string()
    .min(3, "Password must be at least 3 characters long")
    .required("Password is required"),
});

export default createUserSchema;
