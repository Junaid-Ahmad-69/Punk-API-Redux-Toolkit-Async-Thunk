import { createSlice,  type PayloadAction  } from '@reduxjs/toolkit';

export interface WishlistItem {
    abv: 0,
    attenuation_level: 0,
    boil_volume: {
        value: 0,
        unit: ''
    },
    brewers_tips: '',
    contributed_by: '',
    description: '',
    ebc: 0,
    first_brewed: '',
    food_pairing: [],
    ibu: 0,
    id: '',
    image: '',
    ingredients: {
        malt: [],
        hops: [],
        yeast: ''
    },
    method: {
        mash_temp: [],
        fermentation: {
            temp: {
                value: 0,
                unit: ''
            }
        },
        twist: null
    },
    name: '',
    ph: 0,
    srm: 0,
    tagline: '',
    target_fg: 0,
    target_og: 0,
    volume: {
        value: 0,
        unit: ''
    }
}

interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: JSON.parse(sessionStorage.getItem('wishlist') || '[]'),
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<WishlistItem>) => {
            const exists = state.items.find(item => item.id == action.payload.id);
            if (!exists) state.items.push(action.payload);
            sessionStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id != action.payload);
            sessionStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        clearWishlist: (state) => {
            state.items = [];
            sessionStorage.removeItem('wishlist');
        },
    },
});

export const { addItem, removeItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice;

