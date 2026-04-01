export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-6">Page Not Found</p>
            <a href="/" className="text-blue-500 underline">Go back to Home</a>
        </div>
    );
};
