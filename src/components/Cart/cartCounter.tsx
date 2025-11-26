import GButton from "@/components/Button";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {updateQty} from "@/features/cart/slice.ts";


const CartCounter = ({id}: { id: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const item = useSelector((state: RootState) => state.cartReducer.cartLists.find(c => c.id === id));
    if (!item) return null


    const handleDecrement = () => {
        dispatch(updateQty({id, qty: Math.max(1, item.productQty - 1)}));
    }
    const handleIncrement = () => {
        dispatch(updateQty({
            id,
            qty: item.productQty + 1,
        }))
    }

    return (
        <div className='flex items-center gap-3'>
            <GButton
                onClick={handleDecrement}
                className='rounded-md p-3 h-8 hover:bg-yellow-500 hover:border-yellow-500 duration-500 transition-all text-black text-lg hover:text-white bg-transparent border  border-yellow-300 ease-in-out '> - </GButton>
            {item.productQty}
            <GButton
                onClick={handleIncrement}
                className='rounded-md p-3 h-8 hover:bg-yellow-500 hover:border-yellow-500  duration-500 transition-all text-black text-lg hover:text-white bg-transparent border border-yellow-300 ease-in-out '> + </GButton>
        </div>
    )
}

export default CartCounter;