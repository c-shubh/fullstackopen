import CreateUser from "./CreateUser";
import User from "./User";

type CreateUserWithoutPasswordWithPasswordHash = Omit<CreateUser, "password"> &
  Pick<User, "passwordHash">;

export default CreateUserWithoutPasswordWithPasswordHash;
