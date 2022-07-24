import AuthCheck from '../../components/AuthCheck';
import PostList from '../../components/PostList';
import styles from '../../styles/AdminIndex.module.scss';
import CreateNewPost from '../../components/CreateNewPost';

export default function AdminPostsPage(props) {
  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <AuthCheck>
            <CreateNewPost />
            <PostList />
          </AuthCheck>
        </div>
      </div>
    </main>
  )
}
