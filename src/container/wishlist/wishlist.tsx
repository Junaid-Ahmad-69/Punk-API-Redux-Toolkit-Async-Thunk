import type {AppDispatch, RootState} from "../../../store/store.ts";
import {removeItem} from '@/features/wishlist/slice';
import {useDispatch, useSelector} from "react-redux";
import GButton from "@/components/Button/Button.tsx";
import {useNavigate} from "react-router";
import {ViewBeerDetail} from "../../../Routes/Route.tsx";

const WishList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wishlist = useSelector((state: RootState) => state.wishListReducer.items);
    const navigate = useNavigate()

    const handleRemove = (id: string) => {
        dispatch(removeItem(id));
    };
    const handleView = (id: string)=>{
        navigate(ViewBeerDetail.replace(":id", id));
    }

    return (
        <div>
            <h2 className="text-xl font-bold">My Wishlist</h2>
            {wishlist.length === 0 && <p>Your wishlist is empty.</p>}

            <ul>
                {wishlist.map(item => (
                    <li key={item.id} className="flex items-center justify-between w-full p-2 border-b">
                        <div className="flex items-center gap-5">
                            <div>{item.name}</div>
                            <img src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${item.image}`} alt={item.name}  width={16} height={16}/>
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
        </div>
    );
}
export default WishList;