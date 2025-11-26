import {ShoppingCart, X} from "lucide-react";
import {useState} from "react";
import Index from "@/components/GSheet";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import cartPlaceholder from '../../../src/assets/images/cart/cart.svg'
import {removeFromCart} from "@/features/cart/slice.ts";
import {formattedCurrency} from "../../../utils/helper.ts";
import CartCounter from "@/components/Cart/cartCounter.tsx";
import {Badge} from "@/components/ui/badge.tsx";

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
                <span
                    className='cursor-pointer relative bg-yellow-500 h-8 w-8 rounded-md  inline-flex items-center justify-center'
                    onClick={handleOpenSheet}>
                    <ShoppingCart className='text-white'/>
                    {cartLists.length > 0 && <Badge
                        className="h-5 min-w-5 absolute -top-2.5 -right-2 rounded-full px-1 text-white  bg-slate-400 font-mono ">
                        {cartLists.length}
                    </Badge>}
                </span>

            <Index
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
                                        <li key={cart.id} className='bg-gray-200 h-28 m-2 mb-4 p-2 rounded-md'>
                                            <div className='flex items-start relative gap-5'>
                                                <div
                                                    className='w-18 h-24 flex bg-white rounded-md p-2 items-center justify-center'>
                                                    <img
                                                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${cart.image}`}
                                                        className="rounded-md w-full h-full object-contain"
                                                        alt={cart.name}/>
                                                </div>
                                                <div className='flex items-start mt-2 justify-start flex-col'>
                                                    <span className="text-sm font-semibold">{cart.name}</span>
                                                    <span className='text-sm mb-2'>{cart.ingredients.yeast}</span>
                                                    <CartCounter id={cart.id}/>
                                                </div>
                                                <span onClick={() => handleRemoveFromCart(cart.id)}
                                                      className='text-gray-500 cursor-pointer absolute top-0 right-1'><X
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