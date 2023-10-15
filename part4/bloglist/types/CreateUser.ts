import User from "./User";

type CreateUser = Omit<User, "passwordHash" | "id" | "blogs"> & {
  password: string;
};
export default CreateUser;
