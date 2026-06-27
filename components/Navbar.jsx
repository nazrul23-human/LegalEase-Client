"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../components/Avatar";

export default function Navbar() {

    const [token, setToken] = useState(null);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(null);

    const pathname = usePathname();

    useEffect(() => {
        const t = localStorage.getItem("token");
        const r = localStorage.getItem("role");
        setToken(t);
        setRole(r);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;

            try {
                const res = await fetch("http://localhost:5000/api/user/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();
                setUser(data.user);

            } catch (err) {
                console.log("User fetch error:", err);
            }
        };

        fetchUser();
    }, [token]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    };

    //ACTIVE LINK STYLE
    const activeLink = (path) =>
        pathname === path
            ? "bg-white text-blue-700 px-3 py-1 rounded-md font-semibold"
            : "hover:bg-blue-600 px-3 py-1 rounded-md transition";

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-blue-700 text-white shadow-md">

                {/* LEFT SIDE */}
                <Link href="/" className="font-bold text-2xl">
                    LegalEase⚖️
                </Link>

                {/* RIGHT SIDE */}
                <div className="flex gap-4 items-center">

                    <Link href="/" className={activeLink("/")}>
                        Home
                    </Link>

                    <Link href="/browse-lawyers" className={activeLink("/browse-lawyers")}>
                        Lawyers
                    </Link>

                    {token && (
                        <select className="text-black px-2 py-1 rounded">
                            {role === "admin" && <option>Admin</option>}
                            {role === "lawyer" && <option>Lawyer</option>}
                            {role === "user" && <option>User</option>}
                        </select>
                    )}


                    {token ? (
                        <>
                            <Avatar user={{ name: role }} />
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
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
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </nav>
            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden flex flex-col gap-3 bg-blue-800 text-white p-4">

                    <Link href="/" onClick={() => setOpen(false)}>
                        Home
                    </Link>

                    <Link href="/browse-lawyers" onClick={() => setOpen(false)}>
                        Lawyers
                    </Link>

                    {token ? (
                        <>
                            <p className="text-sm">Logged in as {role}</p>

                            <button
                                onClick={() => {
                                    handleLogout();
                                    setOpen(false);
                                }}
                                className="bg-red-500 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setOpen(false)}>
                                Login
                            </Link>

                            <Link href="/register" onClick={() => setOpen(false)}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            )}
        </>
    );
}