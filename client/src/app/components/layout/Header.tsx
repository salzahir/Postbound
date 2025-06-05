"use client";
import Link from "next/link";

export default function Header() {
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Postbound</h1>
      <nav>
        <ul className="flex gap-6 list-none p-0 m-0">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/posts" className="hover:underline">Posts</Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">About</Link>
          </li>
          <li>
            {token ? (
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            ) : (
              <Link href="/login" className="hover:underline">Log in</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}