import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useSummary = () => {
  const [summary, setSummary] = useState({});

  const getSummary = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/summary');

      setSummary(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getSummary();
  }, [getSummary]);

  return { summary };
};

export default useSummary;
