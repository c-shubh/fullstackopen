import { object } from "yup";
import passwordSchema from "./passwordSchema";
import usernameSchema from "./usernameSchema";

const loginUserSchema = object({
  username: usernameSchema,
  password: passwordSchema,
});

export default loginUserSchema;
