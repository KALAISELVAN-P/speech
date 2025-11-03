import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export const authService = {
  // Sign in with email and password
  signIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  // Sign up with email and password
  signUp: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  // Sign in with Google
  signInWithGoogle: () => {
    return signInWithPopup(auth, googleProvider);
  },

  // Sign out
  signOut: () => {
    return signOut(auth);
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};