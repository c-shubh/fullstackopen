import User from "./User";

type CreateUserFromClient = Omit<User, "passwordHash" | "id" | "blogs"> & {
  password: string;
};
export default CreateUserFromClient;
