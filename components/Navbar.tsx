import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useContext } from 'react';
import { UserContext } from '../lib/userContext';
import SignOutButton from './SignOutButton';

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <header style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className={styles.wrapper}>
          <div>
            <Link href="/">
              <button className="custom-btn">FEED</button>
            </Link>
          </div>
          <div className={styles.profileContainer}>
            {!user
              ? (<Link href="/enter">
                  <button className="custom-btn">Log In</button>
                </Link>)
              : (<SignOutButton />)
            }
            {username && (
              <>
                <Link href="/admin">
                  <button className="custom-btn">Write Post</button>
                </Link>
                <Link href={`/${username}`}>
                  <img src={user.photoURL} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
