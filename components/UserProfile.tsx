import React from 'react';

interface UserProps {
  user: {
    username: string;
    photoURL: string;
    displayName: string;
  }
}

export default function UserProfile({ user }: UserProps) {

  return (
    <>
      <img src={user.photoURL} alt="user photo"/>
      <h3>@{user.username}</h3>
      <i>{user.displayName}</i>
    </>
  )
}
