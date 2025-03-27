import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../assets/firebase';

const useFirebase = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log('Snapshot', snapshot);
        setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  return [data, loading, error];
};

const updateUserName = async (userId, currentName) => {
  try {
    const userRef = doc(db, 'Users', userId);
    await updateDoc(userRef, {
      name: `${currentName} - updated`,
    });
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export { useFirebase, updateUserName };
