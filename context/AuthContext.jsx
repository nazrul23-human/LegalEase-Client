"use client";
import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { registerUser, loginUser } from "../api/authApi";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();

    // REGISTER
    const register = async (data) => {
        try {
            const res = await registerUser(data);

            if (res.data.token) {
                document.cookie = `token=${res.data.token}; path=/`;
                localStorage.setItem("role", res.data.user.role);
            }
            if (res.data.user.role === "admin") {
                router.push("/admin");
            }
            else if (res.data.user.role === "lawyer") {
                router.push("/lawyer");
            }
            else {
                router.push("/dashboard");
            }

            return res.data;
        } catch (error) {
            console.log("Register Error:", error);
            throw error.response?.data || { message: "Register failed" };
        }
    };

    // LOGIN
    const login = async (email, password) => {
        try {
            const res = await loginUser({ email, password });

            if (res.data.token) {
                document.cookie = `token=${res.data.token}; path=/`;
                localStorage.setItem("role", res.data.user.role);
            }

            // ROLE REDIRECT
            if (res.data.user.role === "admin") {
                router.push("/admin");
            }
            else if (res.data.user.role === "lawyer") {
                router.push("/lawyer");
            }
            else {
                router.push("/dashboard");
            }

            return res.data;

        } catch (error) {
            console.log("Login Error:", error);
            throw error.response?.data || { message: "Login failed" };
        }
    };



        // LOGOUT
        const logout = () => {

            document.cookie = "token=; Max-Age=0; path=/";
            document.cookie = "role=; Max-Age=0; path=/";

            localStorage.removeItem("role");

            router.push("/login");
        };

        return (
            <AuthContext.Provider value={{ register, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };

    export const useAuth = () => useContext(AuthContext);