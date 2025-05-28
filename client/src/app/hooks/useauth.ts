import { useEffect, useState } from 'react';
import { User } from '@/types/users';
import useApi from './useApi';

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const {fetchData} = useApi("/auth/login", "GET", true);

  useEffect(() => {
    async function checkAuthor() {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const userData = await fetchData();
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    }

    checkAuthor();
  }, [fetchData]);

  const isAuthenticated = Boolean(user && token);

  return { token, user, isAuthenticated };
}

export default useAuth;