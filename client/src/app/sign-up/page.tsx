'use client';
import { useState } from "react";
import Header from "../components/layout/Header";
import { useRouter } from "next/navigation";
import useApi from "../hooks/useApi";
import ApiError from "../components/error/ApiError";

function SignUp() {
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const {fetchData, error: apiError, isApiDown} = useApi("POST", false);

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
            setSuccess("");
            setError("");
            await fetchData("/auth/sign-up", json);
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
                <h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1>
                <form onSubmit={handleRegister} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-white mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-white mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {apiError && <ApiError message={apiError} isApiDown={isApiDown} />}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignUp;