import React from 'react';
import IPost from '../types/IPost';
import styles from '../styles/PostPreview.module.scss';

interface PostPreviewProps {
  data: IPost;
}

function PostPreview({ data }: PostPreviewProps) {
  console.log(data)
  return (
    <div className={styles.blogCard}>
      <div className={styles.meta}>
        <div className={styles.photo} style={{ backgroundImage: 'url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)'}}></div>
        <ul className={styles.details}>
          <li className={styles.author}><a href="#">{data.username}</a></li>
          <li className={styles.date}>Aug. 24, 2015</li>
          <li className={styles.tags}>
            <ul>
              <li><a href="#">Learn</a></li>
              <li><a href="#">Code</a></li>
              <li><a href="#">HTML</a></li>
              <li><a href="#">CSS</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className={styles.description}>
        <h1>{data.title}</h1>
        <h2>by {data.username}</h2>
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
        <p className={styles.readMore}>
          <a href="#">Read More</a>
        </p>
      </div>
    </div>
  )
}

export default PostPreview;