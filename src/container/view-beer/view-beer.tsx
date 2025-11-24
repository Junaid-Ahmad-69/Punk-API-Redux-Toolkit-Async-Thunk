import {useParams} from "react-router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {fetchBeer} from "@/features/beer/actions.ts";
import {Button} from "@/components/ui/button.tsx";
import {Clock, Heart, ShoppingCart, Target, Thermometer} from "lucide-react";
import BadgeItem from "@/components/Badge";
import {addItem, removeItem, type WishlistItem} from "@/features/wishlist/slice.ts";
import type {BeersList} from "../../../utils/types.ts";

const ViewBeer = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const {error, current} = useSelector((state: RootState) => state.beer);
    const wishlist = useSelector((state: RootState) => state.wishListReducer.items);
    const existing = !!wishlist.find(item=> item.id == id)

    useEffect(() => {
        if (!id) return
        dispatch(fetchBeer({id}))
    }, [dispatch, id])

    const handleAddItem = (item: BeersList) => {
        dispatch(addItem(item as WishlistItem));
    }
    const handleRemoveItem = (id: string) => {
        dispatch(removeItem(id));

    }

    if (error) return <div>Error: {error}</div>


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-16 h-full">
                <div className="flex flex-wrap lg:flex-nowrap gap-10 -mx-4">
                    <div className="w-full bg-slate-200 md:w-1/2 h-[44rem] rounded-lg overflow-hidden mb-8">
                        <img
                            src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${current.image}`}
                            alt="Product" className="w-full h-full p-8 object-contain rounded-lg shadow-md mb-4"
                            id="mainImage"/>
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{current.name} ({current.volume.value} {current.volume.unit})</h2>
                        <p className="text-gray-600 mb-8">{current.tagline}</p>

                        <div className="flex items-center gap-8 mb-4">
                            <div className="flex items-start flex-col gap-2">
                                <h5 className="flex items-center gap-2"><Target className="text-amber-500"
                                                                                size={16}/> Target Final Gravity
                                </h5>
                                <span className="ml-6 text-gray-600">{current.target_fg} SI</span>
                            </div>
                            <div className="flex items-start flex-col gap-2">
                                <h5 className="flex items-center gap-2"><Target className="text-red-500"
                                                                                size={16}/> Target Original Gravity
                                </h5>
                                <span className="ml-6 text-gray-600">{current.target_og} SI</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-[Lato-Bold] mb-2">Description</h2>
                            <p className="text-gray-700 mb-6">{current.description}</p>
                        </div>

                        <div className="flex space-x-4 mb-6">
                            <Button
                                className="cursor-pointer bg-amber-500  flex gap-2 items-center text-white px-8 py-[20px] rounded-md hover:bg-amber-600 ">
                                <ShoppingCart size={20} className="text-white"/>
                                Add to Cart
                            </Button>
                            {existing ?
                                (
                                    <Button
                                        onClick={() => handleRemoveItem(current.id)}
                                        className="cursor-pointer bg-red-500  text-white flex gap-2 items-center px-8 py-[20px] rounded-md hover:bg-red-400">
                                        <Heart size={20} className="text-white"/>
                                        Remove
                                    </Button>
                                ):(
                                <Button
                                onClick={() => handleAddItem(current)}
                                className="cursor-pointer bg-gray-200 flex gap-2 items-center  text-gray-800 px-8 py-[20px] rounded-md hover:bg-gray-300 ">
                                <Heart size={20} className="text-black"/>
                                Wishlist
                            </Button>)}
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                            <div className="grid lg:grid-cols-2 md:grid-cols-1">
                                <div>
                                    <h4 className="font-semibold">Hops</h4>
                                    <ul className="list-disc list-inside text-gray-700 mb-8">
                                        {current.ingredients.hops.map((hop, index) => (
                                            <li key={index}
                                                className="capitalize">{hop.attribute} {hop.name} {hop.amount.value} {hop.amount.unit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Malt</h4>
                                    <ul className="list-disc list-inside text-gray-700 mb-8">
                                        {current.ingredients.malt.map((malt, index) => (
                                            <li key={index}
                                                className="capitalize">{malt.name} {malt.amount.value} {malt.amount.unit}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Yeast</h4>
                                    <p>{current.ingredients.yeast}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-[Lato-Bold] mb-2">Food Paring</h2>
                    <div className="flex items-center justify-start gap-2">
                        {current.food_pairing.map((food, index) => <BadgeItem key={index}>{food}</BadgeItem>)}
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-[Lato-Bold] mb-2">Method To Make</h2>
                    <div>
                        <div className="flex items-center justify-start gap-2 mb-4">
                            <h6>Fermentation Temperature:</h6>
                            <span className="flex items-center"><Thermometer size={18}
                                                                             className="text-red-400"/>{current.method.fermentation.temp.value}
                                <sup>o</sup> {current.method.fermentation.temp.unit}</span>
                        </div>

                        <div className="flex items-center justify-start gap-2">
                            <h6>Mash Temperature:</h6>
                            {current.method.mash_temp.map((mash, index) =>
                                <span className="flex items-center" key={index}>
                                    <Thermometer size={18} className="text-red-400"/>
                                    {mash.temp.value} <sup>o</sup> {mash.temp.unit} <Clock size={16}
                                                                                           className="text-amber-500 ml-4 mr-2"/>  ({mash.duration}) mins
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBeer;