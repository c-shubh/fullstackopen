import CreateUserFromClient from "./CreateUserFromClient";
import User from "./User";

type CreateUserToDb = Omit<CreateUserFromClient, "password"> &
  Pick<User, "passwordHash">;

export default CreateUserToDb;
