import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';
import { useAppDispatch } from '../redux/hooks';
import { setUser, setAuthLoading } from '../redux/authSlice';
import type { UserProfile } from '../types/UserProfile';

export const useAuthListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAuthLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          dispatch(setUser(userDoc.data() as UserProfile));
        } else {
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};