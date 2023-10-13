import Blog from "./Blog";

type CreateBlog = Pick<Blog, "author" | "title">;
export default CreateBlog;
