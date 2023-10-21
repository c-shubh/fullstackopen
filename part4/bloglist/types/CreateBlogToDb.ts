import Blog from "./Blog";

type CreateBlogToDb = Pick<Blog, "author" | "title" | "url"> &
  Pick<Partial<Blog>, "likes">;
export default CreateBlogToDb;
