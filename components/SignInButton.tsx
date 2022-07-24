import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { AiOutlineGoogle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

export default function SignInButton() {
  const handleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button
      className="custom-btn btn-green"
      onClick={handleSignIn}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <IconContext.Provider value={{ size: '2em' }}>
        <AiOutlineGoogle />
      </IconContext.Provider>Sign In With Google
    </button>
  )
}