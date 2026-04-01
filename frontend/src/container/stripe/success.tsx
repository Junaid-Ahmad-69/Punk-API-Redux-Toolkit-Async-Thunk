import {CheckCircle, ArrowLeft} from 'lucide-react';
import {useNavigate} from "react-router";
import GButton from "@/components/Button";
import {useDispatch} from "react-redux";
import {clearCart} from "@/features/cart/slice.ts";

const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNavigate = ()=>{
        dispatch(clearCart());
        navigate("/");
    }
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-[9999] bg-[rgba(0,0,0,0.4)] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-16 h-16 text-green-600"/>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your purchase. Your order has been processed and a confirmation email is on its way.
                </p>

                <div className="space-y-4">
                    <GButton onClick={handleNavigate} className="w-full rounded-md text-white p-6 hover:bg-amber-500 hover:text-white">
                        <ArrowLeft className="w-4 h-4"/>
                        Back to Shop
                    </GButton>

                    <p className="text-sm text-gray-400">
                        Order ID: <span className="font-mono">#{(Math.random() * 1000000).toFixed(0)}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Success;