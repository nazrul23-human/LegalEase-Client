"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const [token, setToken] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        const t = localStorage.getItem("token");
        setToken(t);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
    };

    //ACTIVE LINK STYLE
    const activeLink = (path) =>
        pathname === path
            ? "bg-white text-blue-700 px-3 py-1 rounded-md font-semibold"
            : "hover:bg-blue-600 px-3 py-1 rounded-md transition";

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-blue-700 text-white shadow-md">

            {/* LEFT SIDE */}
            <Link href="/" className="font-bold text-2xl">
                LegalEase
            </Link>

            {/* RIGHT SIDE */}
            <div className="flex gap-4 items-center font-bold">

                <Link href="/" className={activeLink("/")}>
                    Home
                </Link>

                <Link href="/browse-lawyers" className={activeLink("/browse-lawyers")}>
                    Lawyers
                </Link>

                {/* AUTH CHECK */}
                {token ? (
                    <>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className={activeLink("/login")}>
                            Login
                        </Link>

                        <Link href="/register" className={activeLink("/register")}>
                            Register
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
}