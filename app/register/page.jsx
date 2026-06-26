"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register({ name, email, password });
            router.push("/login");
        } catch (err) {
            alert(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-6 shadow-md w-96 bg-white rounded">

                <h1 className="text-xl font-bold mb-4">Register</h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    onClick={handleRegister}
                    className="bg-green-600 text-white w-full p-2"
                >
                    Register
                </button>

            </div>
        </div>
    );
}