import React, { useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import app from '../config/firebase-config';

const AuthContext = React.createContext();
const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUpHandler(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signInHandler(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOutHandler() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUpHandler,
    signInHandler,
    signOutHandler,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
