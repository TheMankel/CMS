import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFirestoreData = (url) => {
  const [firestoreData, setFirestoreData] = useState([]);

  const getFirestoreData = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/${url}`);

      setFirestoreData(data);
    } catch (err) {
      console.log(err);
    }
  }, [url]);

  useEffect(() => {
    getFirestoreData();
  }, [getFirestoreData]);

  return { firestoreData };
};

export default useFirestoreData;
