import {
  collection,
  getFirestore,
  query,
  orderBy,
} from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import PostFeed from './PostFeed';


export default function PostList() {
  const ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'posts')
  const postQuery = query(ref, orderBy('createdAt'))

  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  if (!posts) return (<h1>Manage your Posts</h1>)

  return (
    <div>
      <PostFeed posts={posts} admin />
    </div>
  );
}