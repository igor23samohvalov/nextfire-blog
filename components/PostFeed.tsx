import PostItem from './PostItem';
import IPost from "../types/IPost";

interface PostsProps {
  posts: IPost[]
};

export default function PostFeed({ posts }: PostsProps) {
  console.log(posts);

  return (
    <>
      <h3>Recent posts:</h3>
      {posts.map((p) => <PostItem key={p.uid} data={p} />)}
    </>
  )
}
