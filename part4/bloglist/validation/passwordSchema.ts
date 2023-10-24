import { string } from "yup";

const passwordSchema = string()
  .min(3, "Password must be at least 3 characters long")
  .required("Password is required");

export default passwordSchema;
