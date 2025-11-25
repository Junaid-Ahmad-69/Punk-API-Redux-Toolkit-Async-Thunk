import {ShoppingCart, X} from "lucide-react";
import {useState} from "react";
import GSheet from "@/components/GSheet/g-sheet.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import cartPlaceholder from '../../../src/assets/images/cart/cart.svg'
import {removeFromCart} from "@/features/cart/slice.ts";
import {formattedCurrency} from "../../../utils/helper.ts";

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {cartLists, cartTotal} = useSelector((state: RootState) => state.cartReducer);

    const [openSheet, setOpenSheet] = useState<boolean>(false);

    const handleOpenSheet = () => {
        setOpenSheet(true);
    }
    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    }

    return (
        <>
            <span className='cursor-pointer' onClick={handleOpenSheet}> <ShoppingCart/> </span>
            <GSheet
                open={openSheet}
                titleClass='text-2xl'
                descriptionClass='text-lg'
                onOpenChange={setOpenSheet}
                content={
                    <div className='p-2 '>
                        {cartLists.length === 0 ? (
                            <EmptyPlaceholder name='empty cart' url={cartPlaceholder} content='Your Cart is Empty.'/>
                        ) : (
                            <>
                                <ul className='mb-8'>
                                    {cartLists.map((cart) => (
                                        <li key={cart.id} className='bg-gray-200 m-2 p-2 rounded-md'>
                                            <div className='flex items-center relative gap-5'>
                                                <div
                                                    className='w-14 h-14 flex bg-white rounded-md p-2 items-center justify-center'>
                                                    <img
                                                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${cart.image}`}
                                                        width={10} height={10}
                                                        className="rounded-md w-full h-full object-contain"
                                                        alt={cart.name}/>
                                                </div>
                                                <div className='flex items-start flex-col'>
                                                    <span className="text-sm font-semibold">{cart.name}</span>
                                                    <span className='text-sm'>{cart.ingredients.yeast}</span>
                                                </div>
                                                <span onClick={() => handleRemoveFromCart(cart.id)}
                                                      className='text-gray-500 cursor-pointer absolute -top-1 right-1'><X
                                                    width={14}/></span>
                                            </div>
                                        </li>
                                    ))
                                    }
                                </ul>
                                <hr/>
                                <div className='flex items-center py-2 px-4 justify-between'>
                                    <h3 className='font-bold'>Total Price</h3>
                                    <p>{formattedCurrency(cartTotal)}</p>
                                </div>
                            </>
                        )}
                    </div>
                }
                handleSave={() => {
                    handleOpenSheet();
                    setOpenSheet(false)
                }}
                title=" Cart"
            />

        </>
    )
}
export default Cart;