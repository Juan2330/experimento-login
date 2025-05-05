import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
        credentials: "include",
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => setUser(data))
        .catch(() => {});
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
}
