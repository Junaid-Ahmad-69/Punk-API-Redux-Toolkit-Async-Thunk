import {useState} from "react";
import GButton from "@/components/Button/Button.tsx";
import type {BeersList} from "../../../utils/types.ts";
// import {useDispatch, useSelector} from "react-redux";
// import type {AppDispatch, RootState} from "../../../store/store.ts";

 interface Props extends BeersList{
    price: number,
    productQty: number,
}


const CartCounter = (product: Props) => {
    // const dispatch = useDispatch<AppDispatch>();
    // const {cartLists} = useSelector((state: RootState)=> state.cartReducer)



    const [qty, setQty] = useState<number>(Number(product.productQty));

    const handleDecrement = () => {
        setQty((prevState) => prevState > 1 ? prevState - 1 : 1);

    }
    const handleIncrement = () => {
        setQty((prevState) => prevState + 1);
    }

    return (
        <div className='flex items-center gap-4'>
            <GButton
                onclick={handleDecrement}
                className='rounded-md hover:bg-black duration-500 transition-all text-black text-lg hover:text-white bg-transparent border border-black ease-in-out '> - </GButton>
            {qty}
            <GButton
                onclick={handleIncrement}
                className='rounded-md hover:bg-black duration-500 transition-all text-black text-lg hover:text-white bg-transparent border border-black ease-in-out '> + </GButton>
        </div>
    )
}

export default CartCounter;