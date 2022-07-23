import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/userContext';

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);

  return  username 
    ? props.children
    : <Link href="/enter">You must be signed in</Link>;
}