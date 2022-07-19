
import { GetServerSideProps } from 'next';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/UsernameIndex.module.css';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import {
  query,
  collection,
  getFirestore,
  where,
  limit,
  orderBy,
  getDocs,
} from 'firebase/firestore';

export const getServerSideProps: GetServerSideProps = async ({ query: urlQuery }) => {
  const { username } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5) 
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
};

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <UserProfile user={user} />
          <PostFeed posts={posts} />
        </div>
      </div>
    </main>
  )
}
