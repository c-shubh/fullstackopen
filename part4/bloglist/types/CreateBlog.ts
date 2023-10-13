import Blog from "./Blog";

type CreateBlog = Pick<Blog, "author" | "title" | "url"> &
  Pick<Partial<Blog>, "likes">;
export default CreateBlog;
