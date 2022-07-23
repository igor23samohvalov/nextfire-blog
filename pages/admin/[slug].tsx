import AuthCheck from '../../components/AuthCheck';
import { Field, Formik, FormikProps } from 'formik';
import { collection, doc, getFirestore, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { auth, firestore } from '../../lib/firebase';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function AdminPostEdit() {
  const router = useRouter();
  const { slug }:any = router.query;

  const postRef = doc(getFirestore(), 'users', auth.currentUser.uid, 'posts', slug);
  const [post, loading, error, snapshot, reload] = useDocumentDataOnce(postRef);

  if (loading) reload()

  return (
    <main>
      <div className="container">
        <AuthCheck>
          {post && 
            <>
              <h1>{post.title}</h1>
              <p>{post.slug}</p>
            </>
          }
          <PostForm postRef={postRef} />
        </AuthCheck>
      </div>
    </main>
  );
};

// interface IValues {
//   content: string;
//   published: boolean;
// }

function PostForm({ postRef }) {

  return (
    <Formik
      initialValues={{ content: '', published: false }}
      onSubmit={(values, actions) => {
        setDoc(postRef,
          { content: values.content, published: values.published, updatedAt: serverTimestamp() },
          { merge: true }
        );
        actions.setSubmitting(false)
        actions.resetForm();
        toast.success('Post updated successfully!');
      }}
    >
      {({
        values, isSubmitting, handleChange, handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <textarea
            name="content"
            cols={30}
            rows={10} 
            placeholder="content"
            onChange={handleChange}
            value={values.content}
          />
          <label>
            Published
            <Field type="checkbox" name="published" />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

