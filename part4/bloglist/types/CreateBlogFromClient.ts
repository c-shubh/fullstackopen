import Blog from "./Blog";

type CreateBlogFromClient = { authorId: Blog["author"] } & Pick<
  Blog,
  "title" | "url"
> &
  Pick<Partial<Blog>, "likes">;
export default CreateBlogFromClient;
