'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";
import Header from "../components/layout/Header";
import Link from "next/link";
import useApi from "../hooks/useApi";
import ApiError from "../components/error/ApiError";

function Dashboard() {
  const router = useRouter();
  const {fetchData, error, loading, isApiDown} = useApi("GET", true);
  const [user, setUser] = useState<User | null>(null);

  function logoutUser() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {
    async function verifyAuth() {
      try {
        const data = await fetchData("/auth/login");
        setUser(data);
        console.log("User data:", data);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } 
    } verifyAuth();
  },  [fetchData, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <ApiError isApiDown={isApiDown} message="API is down cannot login" />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="">
          {user && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl mb-4">Welcome, {user.name}!</h2>
              <div className="space-y-2">
                <p><span className="font-semibold">Username:</span> {user.username}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">Role:</span> {user.isAuthor ? 'Author' : 'User'}</p>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={logoutUser}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
                {user.isAuthor && (
                  <Link href="/newpost">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                      Create Post
                    </button>
                  </Link>
                )}
                {error && (<p className="text-red-500 mt-4">{error}</p>)}
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default Dashboard;