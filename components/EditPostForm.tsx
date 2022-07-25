import { Field, Formik, FormikProps } from 'formik';
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../lib/firebase';
import toast from 'react-hot-toast';
import styles from '../styles/EditPost.module.scss';
import ReactMarkdown from 'react-markdown';

export default function PostForm({ postRef, defaultValues, preview }) {
  console.log('default values: ', defaultValues)
  const { content } = defaultValues;

  return (
    <Formik
      initialValues={{ content: content }}
      onSubmit={(values, actions) => {
        setDoc(postRef,
          { content: values.content, updatedAt: serverTimestamp() },
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
          {preview && (
            <div className={styles.card}>
              <ReactMarkdown>{values.content}</ReactMarkdown>
            </div>
          )}
          <div className={preview ? styles.hidden : styles.controls}>
            <textarea
              name="content"
              className={styles.textarea}
              placeholder="content"
              onChange={handleChange}
              value={values.content}
            />
            <button
              className="custom-btn btn-orange"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
