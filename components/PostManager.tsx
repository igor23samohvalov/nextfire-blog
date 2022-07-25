import { useState } from 'react';
import Link from 'next/link';
import PostForm from './EditPostForm';
import styles from '../styles/EditPost.module.scss';

function PostManager({ post, postRef }) {
  const [preview, setPreview] = useState<boolean>(false);

  return (
    <>
      <section className={styles.section}>
        <h1>{post.title}</h1>
        <p>ID: {post.slug}</p>

        <PostForm postRef={postRef} defaultValues={post} preview={preview} />
      </section>

      <aside className={styles.aside}>
        <h3>Tools</h3>
        <button
          onClick={() => setPreview(!preview)}
          className="custom-btn" 
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
        <Link href={`/${post.username}/${post.slug}`}>
          <button className="custom-btn">Live view</button>
        </Link>
        <button></button>
      </aside>
    </>
  );
};

export default PostManager;
