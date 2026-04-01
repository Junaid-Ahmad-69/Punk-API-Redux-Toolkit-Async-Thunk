import { XCircle, ShoppingCart } from 'lucide-react';
import {Link} from "react-router";

const Cancel = () => {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-[9999] bg-[rgba(0,0,0,0.4)]  flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 p-4 rounded-full">
                        <XCircle className="w-16 h-16 text-red-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
                <p className="text-gray-600 mb-8">
                    It looks like you cancelled your transaction. No worries—your cart is still waiting for you!
                </p>

                <div className="space-y-4">
                    <Link
                        to="/"
                        className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-xl transition-all"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Return to Cart
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors"
                    >
                        Need help? Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cancel;