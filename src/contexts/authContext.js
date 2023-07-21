import React, { useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import app from '../config/firebase-config';
import { getMessageFromErrorCode } from '../lib/error-code';

const AuthContext = React.createContext();
const auth = getAuth(app);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);

  const signUpHandler = async (email, password) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return credentials;
    } catch (err) {
      const error = {
        code: 400,
        message: getMessageFromErrorCode(err.code),
      };
      return error;
    }
  };

  const signInHandler = async (email, password) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return credentials;
    } catch (err) {
      const error = {
        code: 400,
        message: getMessageFromErrorCode(err.code),
      };
      return error;
    }
  };

  function signOutHandler() {
    return signOut(auth);
  }

  function updateUserPhoto(imageUrl) {
    return updateProfile(auth.currentUser, {
      photoURL: imageUrl,
    });
  }

  function updateUserFullName(firstName, lastName) {
    return updateProfile(auth.currentUser, {
      displayName: firstName + ' ' + lastName,
    });
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000/login',
    });
  }

  function rememberSessionUser() {
    return setPersistence(auth, browserSessionPersistence);
  }

  function deleteUserHandler() {
    return deleteUser(auth.currentUser);
  }

  function reauthenticateUser(password) {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password,
    );

    return reauthenticateWithCredential(auth.currentUser, credential);
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
    updateUserFullName,
    updateUserEmail,
    updateUserPassword,
    forgotPassword,
    rememberSessionUser,
    deleteUserHandler,
    reauthenticateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
