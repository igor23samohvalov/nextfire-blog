
import { GetServerSideProps } from 'next';
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import styles from '../../styles/UsernameIndex.module.css';
import { getUserWithUsername, postToJSON, firestore } from '../../lib/firebase';
import {
  query,
  collection,
  getFirestore,
  where,
  limit,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

export const getServerSideProps: GetServerSideProps = async ({ query: urlQuery }) => {
  const { username } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  if (userDoc) {
    user = userDoc.data();
    console.log('userDoc ref', userDoc.ref.path)
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
