import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Enter.module.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import debounce from 'lodash/debounce';
import { UserContext } from '../lib/userContext';
import { doc, getDoc, writeBatch } from 'firebase/firestore';


function SignInButton() {
  const handleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider);
  }
  return (
    <button onClick={handleSignIn}>
      Sign In
    </button>
  )
}
function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>
      Sign Out
    </button>
  )
}
function UsernameForm() {
  const { user, username } = useContext(UserContext);

  const [value, setValue] = useState<string>('');
  const [isValid, setValid] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const checkUsername = useCallback(
    debounce(async (val) => {
      if (val.length >= 3) {
        const usernameRef = doc(firestore, 'usernames', val);
        const usernameSnap = await getDoc(usernameRef);
        console.log('Firestore read proceed.')
        setValid(!usernameSnap.exists())
        setLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    checkUsername(value);
  }, [value]);

  const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (value.length < 3) {
      setValue(value);
      setValid(false);
      setLoading(false);
    }
    if (re.test(value)) {
      setValue(value);
      setLoading(true);
      setValid(false);
    }

  };
  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const userDoc = doc(firestore, 'users', user.uid);
    const usernameDoc = doc(firestore, 'usernames', value);

    const batch = writeBatch(firestore);

    batch.set(userDoc, { username: value, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Choose Username:</h3>
        <input
          type="text"
          placeholder="Enter username"
          name="username"
          onChange={handleChange}
        />
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <h3>Debug state:</h3>
      <div>
        Username: {value}
        <br />
        Loading: {isLoading.toString()}
        <br />
        Valid: {isValid.toString()}
      </div>
    </>
  )
}


export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      <div className="container">
        <div className={styles.wrapper}>
          {
            user ?
              !username ? <UsernameForm /> : <SignOutButton />
            :
              <SignInButton />
          }
        </div>
      </div>
    </main>
  )
}