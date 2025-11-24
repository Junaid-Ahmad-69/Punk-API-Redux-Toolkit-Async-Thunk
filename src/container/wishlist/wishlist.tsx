import type {AppDispatch, RootState} from "../../../store/store.ts";
import {clearWishlist, removeItem} from '@/features/wishlist/slice';
import {useDispatch, useSelector} from "react-redux";
import GButton from "@/components/Button/Button.tsx";
import {useNavigate} from "react-router";
import {ViewBeerDetail} from "../../../Routes/Route.tsx";
import {useState} from "react";
import GDialog from "@/components/GDialog/g-dialog.tsx";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import EmptyPlaceholderImage from '../../../src/assets/images/wishlist/wishlist-empty.svg'

const WishList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state: RootState) => state.wishListReducer.items);
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const [confirmId, setConfirmId] = useState<string>('')

    const handleRemove = (id: string) => {
        setOpen(true)
        setConfirmId(id)

    };
    const handleView = (id: string) => {
        navigate(ViewBeerDetail.replace(":id", id));
    }

    const handleConfirm = () => {
        dispatch(removeItem(confirmId));

    }
    const handleClearCart=()=>{
        dispatch(clearWishlist())
    }

    return (
        <div>
            <div className='flex items-center justify-between w-full'>
            <h2 className="text-xl font-bold">My Wishlist</h2>
                {!!wishlist.length && (
                    <GButton onclick={()=>handleClearCart()} className='bg-transparent hover:text-slate-600 border rounded-md text-slate-600 font-medium border-slate-600'>
                        Clear Cart
                    </GButton>
                )}
            </div>
            {wishlist.length === 0 && <EmptyPlaceholder width={600} height={400} name={"wishlist"} url={EmptyPlaceholderImage} content={"Your Wishlist is Empty!"} />}

            <ul>
                {wishlist.map(item => (
                    <li key={item.id} className="flex items-center justify-between w-full p-2 border-b">
                        <div className="flex items-center gap-5">
                            <div>{item.name}</div>
                            <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${item.image}`} alt={item.name}
                                 width={16} height={16}/>
                        </div>
                        <div className='flex items-center gap-4'>
                            <GButton onclick={() => handleView(item.id)}
                                     className="hover:bg-black hover:text-white">
                                View
                            </GButton>
                            <GButton onclick={() => handleRemove(item.id)}
                                     className="bg-transparent hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out border-red-500 border   text-red-500">
                                Remove
                            </GButton>
                        </div>
                    </li>
                ))}
            </ul>
            <GDialog
                open={open}
                titleClass="text-red-500 text-2xl"
                descriptionClass="text-slate-600 text-lg"
                onOpenChange={setOpen}
                handleSave={() => {
                    handleConfirm()
                    setOpen(false)
                }}
                title="Confirm Delete"
                description="Are you sure you want to remove this item?"
            />
        </div>
    );
}
export default WishList;