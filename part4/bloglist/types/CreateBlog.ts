import Blog from "./Blog";

type CreateBlog = Pick<Blog, "author" | "title"> & Pick<Partial<Blog>, "likes">;
export default CreateBlog;
