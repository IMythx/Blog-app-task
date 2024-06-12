import Post from "./post";

const PostsGrid = async ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-7 px-4 sm:px-10">
      {posts?.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default PostsGrid;
