'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
        setUser(data);  // Store the user data
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Welcome, {user.name}!</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Username:</span> {user.username}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {user.isAuthor ? 'Author' : 'User'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;