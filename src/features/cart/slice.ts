import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {ToasterMessage} from "@/components/Toast";
import type {BeersList} from "../../../utils/types.ts";
import {getSessionStorage} from "../../../utils/helper.ts";


export interface CartListItems extends BeersList{
    price: number,
    productQty: number,
}

interface CartListsProps {
    cartLists: CartListItems[];
    cartTotal: number;
}

const storedCart = JSON.parse(getSessionStorage('cart') || '[]');

const initialState: CartListsProps = {
    cartLists:storedCart,
    cartTotal: storedCart.reduce((acc: number, curr: CartListItems)=> (acc + curr.price) * Number(curr.productQty), 0),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartListItems>) => {
            const exitingProduct = state.cartLists.find(item=> item.id === action.payload.id);
            if(!exitingProduct){
                state.cartLists.push(action.payload);
                ToasterMessage({
                    type: "success",
                    message: "Successfully Added!",
                    description: "Product successfully added to Cart.",
                });
            }
            else {
                ToasterMessage({
                    type: "warning",
                    message: "Already Added!",
                    description: "Product already added to Cart.",
                });
            }
            state.cartTotal =  state.cartLists.reduce((acc:number, curr: CartListItems)=> (acc + curr.price) * curr.productQty, 0)
            sessionStorage.setItem('cart', JSON.stringify(state.cartLists));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartLists = state.cartLists.filter(item=> item.id != action.payload);
            sessionStorage.setItem('cart', JSON.stringify(state.cartLists));
            ToasterMessage({
                type: "success",
                message: "Successfully Removed!",
                description: "Product successfully removed from cart.",
            });
            state.cartTotal =  state.cartLists.reduce((acc:number, curr: CartListItems)=> (acc + curr.price) * curr.productQty, 0)
        },
        updateQty: (state, action: PayloadAction<{ id: string, qty: number }>) => {
            const item = state.cartLists.find(item=>item.id === action.payload.id);
            if(item){
                item.productQty = action.payload.qty;
                state.cartTotal = state.cartLists.reduce((acc: number, curr: CartListItems)=> acc + curr.price * curr.productQty, 0)
                sessionStorage.setItem('cart', JSON.stringify(state.cartLists));
            }
}
    }
})

export const {addToCart, removeFromCart, updateQty} = cartSlice.actions;
export default cartSlice
