import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
            method: "GET",
            credentials: "include", 
        })
        .then((res) => {
            if (!res.ok) {
                console.error("Error fetching user:", res.status);
                return null;
            }
            return res.json();
        })
        .then((data) => setUser(data))
        .catch((err) => {
            console.error("Fetch error:", err);
            setUser(null);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
