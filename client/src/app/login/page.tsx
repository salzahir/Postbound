"use client";

import { FormEvent } from "react";
import loginUser from "./login";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSucess] = useState("");

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
        setError("");
        setSucess("");

      try {
        const formData = new FormData(event.currentTarget);
        const data = await loginUser(formData);
        setSucess("Login successful!");
        console.log("Login response:", data);
                setTimeout(() => {
        router.push("/posts"); 
      }, 1000);
      } catch (error) {
        console.error("Error during login:", error);
        setError("Login failed. Please check your credentials.");
      }
    }
    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">Login</button>
            </form>

            {success && <p className="text-green-500 mt-4">{success}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    )
}

export default LoginPage;