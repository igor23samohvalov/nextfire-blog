import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';

export default function SignInButton() {
  const handleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button onClick={handleSignIn}>
      Sign In
    </button>
  )
}