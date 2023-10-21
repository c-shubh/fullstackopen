import Blog from "./Blog";

type PopulatedBlogInUser = Omit<Blog, "author">;
export default PopulatedBlogInUser;
