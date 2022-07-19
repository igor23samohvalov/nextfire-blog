import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import {
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  Timestamp,
  startAfter,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import styles from '../styles/Home.module.css';
import { firestore, postToJSON } from '../lib/firebase';
import IPost from '../types/IPost';
import PostFeed from '../components/PostFeed';


const LIMIT = 2;

export const getServerSideProps = async () => {
  const postsQuery = query(
    collectionGroup(firestore, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }
  }
};

interface HomeProps {
  posts: IPost[];
}

export default function Home({ posts: incPosts }: HomeProps) {
  const [posts, setPosts] = useState<IPost[]>(incPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

    const postsQuery = query(
      collectionGroup(firestore, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map(postToJSON);

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }

  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <PostFeed posts={posts} />
          {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}
          <Loader show={loading} />
          {postsEnd && 'You have reached the end!'}
        </div>
      </div>
    </main>
  )
}
