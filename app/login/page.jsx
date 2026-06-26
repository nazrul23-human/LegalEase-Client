"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            router.push("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 shadow-md w-96 bg-white rounded">

                <h1 className="text-xl font-bold mb-4">Login LegalEase</h1>

                {error && (
                    <p className="text-red-500 mb-2">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white w-full p-2"
                >
                    Login
                </button>

            </div>
        </div>
    );
}