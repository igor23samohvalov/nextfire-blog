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
      <div className={styles.box}>
        <form onSubmit={createPost}>
          <span className={styles.textCenter}>New Post</span>
          <div className={styles.inputContainer}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
              id="postTitle"
            />
            <label htmlFor="postTitle">Post Title</label>
          </div>
          <div className={styles.checkbox}>
            <input type="checkbox" name="published" id="published" />
            <label htmlFor="published">Published</label>
          </div>
          <button type="submit" disabled={!isValid} className="custom-btn btn-orange">
            Create New Post
          </button>
        </form>
      </div>
      
    </div>
    
  );
}