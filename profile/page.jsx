"use client";

export default function Profile() {

    const token = typeof window !== "undefined"
        ? document.cookie
        : null;

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">
                My Profile
            </h1>

            <p>Token: {token}</p>
        </div>
    );
}