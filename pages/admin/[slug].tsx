import AuthCheck from '../../components/AuthCheck';
import { doc, getFirestore } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/router';

import PostManager from '../../components/PostManager';


export default function AdminPostEdit() {
  const router = useRouter();
  const { slug }:any = router.query;

  const postRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'posts', slug);
  const [post, loading, error, snapshot, reload] = useDocumentDataOnce(postRef);

  if (loading) reload()

  return (
    <AuthCheck>
      <main>
        <div className="container">
          <div style={{ minHeight: '100vh', display: 'flex' }}>
            {post && <PostManager post={post} postRef={postRef} />}
          </div>
        </div>
      </main>
    </AuthCheck>
  );
};

