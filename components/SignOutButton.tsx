import { auth } from '../lib/firebase';

export default function SignOutButton() {
  return (
    <button className="custom-btn btn-grey" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
};