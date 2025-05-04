export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            {children}
            </div>
        </div>
    );
}
