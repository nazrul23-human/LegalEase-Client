"use client";

import { useEffect, useState } from "react";

export default function Profile() {

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [token, setToken] = useState("");

    //LOAD TOKEN (optional for display/debug)
    useEffect(() => {
        const t = document.cookie;
        setToken(t);
    }, []);

    // UPDATE PROFILE (future API)
    const updateProfile = async () => {
    const res = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            name,
            avatar
        })
    });

    const data = await res.json();
    alert(data.message);
};

    return (
        <div className="p-10 max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                My Profile
            </h1>

            {/* NAME INPUT */}
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="border p-2 block mb-3 w-full"
            />

            {/* AVATAR INPUT */}
            <input
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Avatar URL"
                className="border p-2 block mb-3 w-full"
            />

            {/* TOKEN SHOW (optional) */}
            <p className="text-sm text-gray-500 mb-4">
                Token: {token ? "Logged In" : "Not Found"}
            </p>

            {/* BUTTON */}
            <button
                onClick={updateProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Update Profile
            </button>
        </div>
    );
}