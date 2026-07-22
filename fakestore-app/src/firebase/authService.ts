import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import type { UserProfile } from '../types/UserProfile';
import { deleteUser } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';

export const getUserProfile = async (uid: string): Promise<UserProfile> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (!userDoc.exists()) {
    throw new Error('User profile not found.');
  }
  return userDoc.data() as UserProfile;
};

export const updateUserProfile = async (
  uid: string,
  updates: Partial<Pick<UserProfile, 'name' | 'address'>>
): Promise<void> => {
  await updateDoc(doc(db, 'users', uid), updates);
};

export const deleteUserAccount = async (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('No user is currently logged in.');
  }

  await deleteDoc(doc(db, 'users', currentUser.uid));

  await deleteUser(currentUser);
};

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  address: string
): Promise<UserProfile> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;

  const newUserProfile: UserProfile = {
    uid,
    email,
    name,
    address,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, 'users', uid), newUserProfile);
  return newUserProfile;
};

export const loginUser = async (email: string, password: string): Promise<UserProfile> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;

  const userDoc = await getDoc(doc(db, 'users', uid));

  if (!userDoc.exists()) {
    throw new Error('User profile not found in database.');
  }

  return userDoc.data() as UserProfile;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};