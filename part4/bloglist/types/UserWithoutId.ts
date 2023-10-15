import User from "./User";

type UserWithoutId = Omit<User, "id">;
export default UserWithoutId;
