import { useState } from 'react';
import AuthCheck from '../../components/AuthCheck';
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { auth, getUserWithUsername } from '../../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../../lib/userContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { kebabCase } from 'lodash';
import toast from 'react-hot-toast';
import PostFeed from '../../components/PostFeed';
import { useRouter } from 'next/router';

function PostList() {
  const ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'posts')
  const postQuery = query(ref, orderBy('createdAt'))

  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  if (!posts) return (<h1>Manage your Posts</h1>)

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), 'users', uid, 'posts', slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(ref, data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}

export default function AdminPostsPage(props) {
  return (
    <main>
      <div className="container">
        <AuthCheck>
          <PostList />
          <CreateNewPost />
        </AuthCheck>
      </div>
    </main>
  )
}
