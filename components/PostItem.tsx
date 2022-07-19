import React from 'react';
import IPost from '../types/IPost';
import styles from '../styles/PostItem.module.css';

interface PostItemProps {
  data: IPost;
}

export default function PostItem({ data }: PostItemProps) {
  return (
    <div className={styles.card}>
      <i>by @{data.username}</i>
      <h5>{data.title}</h5>
    </div>
  )
}
