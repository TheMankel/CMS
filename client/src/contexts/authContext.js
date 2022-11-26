import React, { useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import app from '../config/firebase-config';

const AuthContext = React.createContext();
const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
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

  function updateUserPhoto(imageUrl) {
    return updateProfile(auth.currentUser, {
      photoURL: imageUrl,
    });
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/login',
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const token = await user?.getIdTokenResult(true);
      setRole(token?.claims.admin);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signUpHandler,
    signInHandler,
    signOutHandler,
    role,
    setRole,
    updateUserPhoto,
    forgotPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
