import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return;
        }

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => setUser(data))
            .catch(() => {});
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
