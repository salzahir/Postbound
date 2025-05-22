'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token found");
        }

        const res = await fetch("http://localhost:3001/auth/login", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        console.log("Authenticated:", data);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}

export default Dashboard;