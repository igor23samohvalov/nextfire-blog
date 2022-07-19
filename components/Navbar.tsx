import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useContext } from 'react';
import { UserContext } from '../lib/userContext';

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <header>
      <div className="container">
        <div className={styles.wrapper}>
          <div>
            <Link href="/">
              <button className="btn-blue">FEED</button>
            </Link>
          </div>
          <div className={styles.profileContainer}>
            {username && (
              <>
                <Link href="/admin">
                  <button>Write Posts</button>
                </Link>
                <Link href={`/${username}`}>
                  <img src={user.photoURL} />
                </Link>
              </>
            )}

            {!username && (
              <Link href="/enter">
                <button className="btn-blue">Log In</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
