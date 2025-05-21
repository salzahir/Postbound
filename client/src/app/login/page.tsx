"use client";

import { FormEvent } from "react";
import loginUser from "./login";

function LoginPage() {

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const formData = new FormData(event.currentTarget);
        const data = await loginUser(formData);
        console.log("Login response:", data);
      } catch (error) {
        console.error("Error during login:", error);
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
        </div>
    )
}

export default LoginPage;