import PopulatedBlogInUser from "./PopulatedBlogInUser";
import User from "./User";

type UserToClient = Omit<User, "passwordHash" | "blogs"> & {
  blogs: PopulatedBlogInUser;
};
export default UserToClient;
