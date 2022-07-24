import { useState } from 'react';
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/userContext';
import { kebabCase } from 'lodash';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import styles from '../styles/CreatePost.module.scss';

export default function CreateNewPost() {
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
    <div>
      <h3>Manage your Posts</h3>
      <form onSubmit={createPost} className={styles.form}>
        <h4 className={styles.title}>New Post:</h4>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Article!"
          className={styles.titleInput}
        />
        <label htmlFor="published">Published:</label>
        <input type="checkbox" name="published" />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="custom-btn btn-green">
          Create New Post
        </button>
      </form>
    </div>
    
  );
}