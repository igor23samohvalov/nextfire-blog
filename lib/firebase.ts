import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpAGl8F-dtjPCJeipp12UaTa-j6nGbyNg",
  authDomain: "nextfire-blog-9193a.firebaseapp.com",
  projectId: "nextfire-blog-9193a",
  storageBucket: "nextfire-blog-9193a.appspot.com",
  messagingSenderId: "135619176008",
  appId: "1:135619176008:web:3c0afc581c84b7451f1a7d"
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
};

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = 'state_changed';

export async function getUserWithUsername(username) {
  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];

  return userDoc;
}

export function postToJSON(doc) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}