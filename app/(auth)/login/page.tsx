"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid credentials");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to BB85</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-neon-blue"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-neon-blue"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">
                    Sign In
                </button>
                <p className="mt-4 text-center text-sm text-gray-400">
                    Don't have an account? <a href="/register" className="text-neon-blue hover:underline">Register</a>
                </p>
            </form>
        </div>
    );
}
