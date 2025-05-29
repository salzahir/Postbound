'use client';
import { useState } from "react";
import Header from "../components/layout/Header";
import { useRouter } from "next/navigation";
import { getApiUrl } from '../services/api';

function SignUp() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const json = {
            name: formData.get("name"),
            username: formData.get("username"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            email: formData.get("email"),
        };

        if (json.password !== json.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setError("");
            setSuccess("");
            const res = await fetch(getApiUrl("/auth/sign-up"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to register");
                return;
            }

            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            console.error("Error during registration:", error);
            setError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-3xl font-bold text-white mb-6">Register</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4 bg-gray-800 p-6 rounded-md w-full max-w-md shadow-lg">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-semibold text-white">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-semibold text-white">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            required
                            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mt-4"
                    >
                        Register
                    </button>
                </form>
                {success && (
                    <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded">
                        <p className="text-green-400">{success}</p>
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default SignUp;