// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
  NextOrObserver,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCARYr380iRx28alLu0xUhn4IKbuBg-Lz8",
  authDomain: "moviebox-e8924.firebaseapp.com",
  projectId: "moviebox-e8924",
  storageBucket: "moviebox-e8924.firebasestorage.app",
  messagingSenderId: "356667515877",
  appId: "1:356667515877:web:b93099e5e167843932450c",
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const updateUserProfile = async (
  user: User | null,
  additionalData: Partial<User>
) => {
  if (user) {
    try {
      await updateProfile(user, additionalData);
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  }
};
