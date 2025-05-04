export default function Login() {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
        };
    
        return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Inicia sesión con GitHub</h1>
            <button
            onClick={handleLogin}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
            Login con GitHub
            </button>
        </div>
    );
}
