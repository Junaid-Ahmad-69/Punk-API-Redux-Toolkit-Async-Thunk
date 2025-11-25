import {combineReducers, configureStore} from '@reduxjs/toolkit';
import beerSlice from "@/features/beer/slice.ts";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loaderSlice from "@/features/loader/slice.ts";
import userAuthSlice from "@/features/auth/slice.ts";
import wishlistSlice from "@/features/wishlist/slice.ts";
import cartSlice from "@/features/cart/slice.ts";

const rootReducer = combineReducers({
    beer: beerSlice.reducer,
    loader: loaderSlice.reducer,
    userAuth: userAuthSlice.reducer,
    wishListReducer: wishlistSlice.reducer,
    cartReducer: cartSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['beer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)