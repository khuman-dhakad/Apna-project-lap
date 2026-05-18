import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, googleProvider } from '../firebaseconfig';
import { useApp } from './AppContext';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useApp();

  const signUp = async (email, password, displayName) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(user, { displayName });
    }
  };

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        dispatch({
          type: 'LOGIN',
          payload: {
            id: user.uid,
            name: user.displayName || '',
            email: user.email || '',
            avatar: user.photoURL || '',
            isSeller: false,
            verified: false,
            joinedAt: user.metadata?.creationTime || new Date().toISOString(),
            preferences: {
              currency: 'INR',
              notifications: true,
              newsletter: false,
              theme: 'light',
            },
          }
        });
      } else {
        dispatch({ type: 'SignOut' });
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const value = {
    currentUser,
    loading,
    user: null,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
