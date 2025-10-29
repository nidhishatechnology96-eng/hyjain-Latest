import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

// ✅ THIS IS THE CORRECTED LOGIC
// It now ONLY checks for the specific admin email.
export const getRole = (user) => {
  if (!user || !user.email) return 'customer';
  const email = user.email.toLowerCase();
  
  // The ONLY admin is this specific email address.
  if (email === 'nidhishatechnology96@gmail.com') return 'admin';
  
  // Other staff roles remain the same
  if (email.endsWith('@staff.com')) return 'staff';
  if (email.endsWith('@delivery.com')) return 'delivery';
  
  // All other users are customers.
  return user.role || 'customer';
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('customer');
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, fullName, mobile) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      fullName, email, mobile, role: 'customer',
    });
    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    const userWithRole = { ...userCredential.user, ...(userDoc.exists() ? userDoc.data() : {}) };
    const role = getRole(userWithRole);
    return { userCredential, role };
  };

  const adminLogin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    const userWithRole = { ...userCredential.user, ...(userDoc.exists() ? userDoc.data() : {}) };
    const role = getRole(userWithRole);
    if (!['admin', 'staff', 'delivery'].includes(role)) {
        await signOut(auth);
        throw new Error("Access Denied: This portal is for authorized personnel only.");
    }
    return userCredential;
  };

  const logout = () => signOut(auth);
  
  const updateUserProfile = (uid, data) => setDoc(doc(db, 'users', uid), data, { merge: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        const completeUserObject = {
          ...user,
          ...(userDoc.exists() ? userDoc.data() : {}),
        };
        const role = getRole(completeUserObject);
        setCurrentUser(completeUserObject);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole('customer');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    signup,
    login,
    adminLogin,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}