"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push("/login");
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed");
            }
        } catch (err: any) {
            setError("An error occurred");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-neon-blue"
                        required
                    />
                </div>
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
                <button type="submit" className="w-full p-2 bg-green-600 hover:bg-green-700 rounded transition-colors">
                    Register
                </button>
                <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account? <a href="/login" className="text-neon-blue hover:underline">Login</a>
                </p>
            </form>
        </div>
    );
}
