'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";
import checkAuth from "./checkauth";
import Header from "../header";
import Link from "next/link";

async function verifyAuth(
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: ReturnType<typeof useRouter>
) {
  try {
    const data = await checkAuth("/auth/login");
    setUser(data);
    console.log("User data:", data);
  } catch (error) {
    console.error("Auth check failed:", error);
    router.push("/login");
  } finally {
    setLoading(false);
  }
}

function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  function logoutUser() {
    localStorage.removeItem("token");
    router.push("/login");
  }
  
  useEffect(() => {
    verifyAuth(setUser, setLoading, router);
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Header />
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

          <div>
            <button
              onClick={logoutUser}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div>
            <button>
              <Link href="/newpost">Create Post</Link>
            </button>
          </div>
          
        </div>
      )}
    </div>
    </>
  );
}

export default Dashboard;