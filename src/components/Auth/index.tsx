import Login from "@/components/Login";
import GoogleActionLogin from "@/components/GoogleActions/google-action-login.tsx";

export default function AuthLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <img
                        src='public/logo.png'
                        alt="Company Logo"
                        className="h-16"
                    />
                </div>

                <Login/>

                <div className="my-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white/90 text-gray-500">
                            Or continue with
                          </span>
                        </div>
                    </div>
                </div>
                <GoogleActionLogin/>
            </div>
        </div>
    );
}