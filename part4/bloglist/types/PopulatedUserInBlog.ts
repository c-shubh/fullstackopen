import UserToClient from "./UserToClient";

type PopulatedUserInBlog = Omit<UserToClient, "blogs">;
export default PopulatedUserInBlog;
