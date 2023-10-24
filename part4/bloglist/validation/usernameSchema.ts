import { string } from "yup";

const usernameSchema = string()
  .min(3, "Username must be at least 3 characters long")
  .required("Username is required");

export default usernameSchema;
