import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';
import type { UserProfile } from '../types/UserProfile';

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