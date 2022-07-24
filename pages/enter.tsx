import { useContext } from 'react';
import styles from '../styles/Enter.module.css';
import { UserContext } from '../lib/userContext';
import SignInButton from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import UsernameForm from '../components/UsernameForm';

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.enterCard}>
            {
              user ?
                !username ? <UsernameForm /> : <SignOutButton />
              :
                <SignInButton />
            }
          </div>

        </div>
      </div>
    </main>
  )
}