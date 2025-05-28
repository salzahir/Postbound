"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "../components/layout/header";
import Link from "next/link";
import useApi from "../hooks/useApi";

function LoginPage() {
  const router = useRouter();
  const [success, setSucess] = useState("");
  const {fetchData, loading, error} = useApi("/auth/login", "POST", false);
  
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSucess("");
    try {
      const formData = new FormData(event.currentTarget);
      const json = Object.fromEntries(formData.entries());
      const data = await fetchData(json);
      console.log("Login response:", data);
      localStorage.setItem('token', data.token);
      setSucess("Login successful!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="password"
              className="text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {success && (
          <p className="bg-green-100 text-green-700 p-2 rounded mt-4">{success}</p>
        )}
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mt-4">{error}</p>
        )}
        <p className="text-gray-400 bg-gray-900 p-4 rounded-lg shadow-md">
          Don&apos;t have an account? <Link href="/sign-up" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;