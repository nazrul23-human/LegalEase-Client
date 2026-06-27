"use client";

import { useEffect, useState } from "react";

export default function Admin() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/users")
            .then(res => res.json())
            .then(data => setUsers(data.users));
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>

            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u, i) => (
                        <tr key={i}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}