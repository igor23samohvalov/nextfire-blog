import IPost from '../types/IPost';
import PostPreview from './PostPreview';

interface PostsProps {
  posts: IPost[],
  admin: boolean,
};

export default function PostFeed({ posts, admin }: PostsProps | any) {

  return (
    <>
      <h3>Recent posts:</h3>
      {posts.map((p) => <PostPreview key={p.slug} data={p} />)}
    </>
  )
}
