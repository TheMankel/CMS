import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useRecentUsers = () => {
  const [recentUsers, setRecentUsers] = useState([]);

  const getRecentUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8000/api/recent-users',
      );

      setRecentUsers(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getRecentUsers();
  }, [getRecentUsers]);

  return { recentUsers };
};

export default useRecentUsers;
