import Blog from "./Blog";
import PopulatedUserInBlog from "./PopulatedUserInBlog";

type BlogToClient = Omit<Blog, "author"> & {
  author: PopulatedUserInBlog;
};
export default BlogToClient;
