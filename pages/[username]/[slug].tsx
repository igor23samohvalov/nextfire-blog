import {
  getDocs,
  getFirestore,
  query,
  collectionGroup,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore';
import { GetStaticProps  } from 'next';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import PostItem from '../../components/PostItem';
import styles from '../../styles/UsernameIndex.module.css';


export const getStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post = null;
  let path = null;

  if (userDoc) {
    const postRef = doc(getFirestore(), userDoc.ref.path, 'posts', slug);

    post = postToJSON(await getDoc(postRef));
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
};

export const getStaticPaths = async () => {
  const postsQuery = query(
    collectionGroup(getFirestore(), 'posts'),
    limit(20)
  );
  const postsSnap = await getDocs(postsQuery);

  const paths = postsSnap.docs.map((doc) => {
    const { username, slug } = doc.data();

    return {
      params: { username, slug },
    }
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export default function Post(props) {
  console.log(props)
  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <PostItem data={props.post} />
        </div>
      </div>
    </main>
  );
};
