import { createSlice,  type PayloadAction  } from '@reduxjs/toolkit';
import {ToasterMessage} from "@/components/Toast";
import type {BeersList} from "../../../utils/types.ts";


interface WishlistState {
    items: BeersList[];
}

const initialState: WishlistState = {
    items: JSON.parse(sessionStorage.getItem('wishlist') || '[]'),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<BeersList>) => {
            const exists = state.items.find(item => item.id == action.payload.id);
            if (!exists) {
                state.items.push(action.payload)
                ToasterMessage({
                    type: "success",
                    message: "Successfully Added!",
                    description: "Product successfully added to wishlist.",
                });
            };
            sessionStorage.setItem('wishlist', JSON.stringify(state.items));

        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id != action.payload);
            sessionStorage.setItem('wishlist', JSON.stringify(state.items));
            ToasterMessage({
                type: "success",
                message: "Successfully Removed!",
                description: "Product successfully removed from wishlist.",
            });
        },
        clearWishlist: (state) => {
            state.items = [];
            sessionStorage.removeItem('wishlist');
            ToasterMessage({
                type: "success",
                message: "Successfully Empty!",
                description: "No data in wishlist.",
            });
        },
    },
});

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice;

