import { useContext } from "react";
import { UserContext } from "../context";

export default function MyAccount() {
    const { user } = useContext(UserContext);

    const logout = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/logout`;
    };

    if (!user) return <p>Cargando...</p>;

    return (
        <div className="text-center">
        <img
            src={user.photos[0].value}
            alt="Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="mb-4">{user.displayName}</p>
        <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Cerrar sesión
        </button>
        </div>
    );
}
