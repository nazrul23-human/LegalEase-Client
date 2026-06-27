"use client";

import { useEffect, useState } from "react";

export default function LawyersPage() {

    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/user/lawyers")
            .then(res => res.json())
            .then(data => setLawyers(data.lawyers))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-5">
                Lawyers List
            </h1>

            {lawyers.map((lawyer, index) => (
                <div key={index} className="border p-3 mb-2 rounded">
                    <h2 className="font-bold">{lawyer.name}</h2>
                    <p>{lawyer.email}</p>
                    <p className="text-sm text-gray-500">{lawyer.role}</p>
                </div>
            ))}
        </div>
    );
}