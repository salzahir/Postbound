import { useEffect, useState } from 'react';
import { User } from '@/types/users';
import checkAuth from '../dashboard/checkauth';

function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuthor() {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          const userData = await checkAuth("/auth/login");
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    }

    checkAuthor();
  }, []);

  const isAuthenticated = Boolean(user && token);

  return { token, user, isAuthenticated };
}

export default useAuth;