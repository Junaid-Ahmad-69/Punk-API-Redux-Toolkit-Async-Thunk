import { createSlice,  } from "@reduxjs/toolkit";
import {stripeReducer} from "@/features/stripe/reducer.ts";
import type {StripeState} from "../../../utils/types.ts";

const initialState: StripeState = {
    loading: false,
    error: null,
    checkoutUrl: null,
};


const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {
        resetStripeState: (state) => {
            state.loading = false;
            state.error = null;
            state.checkoutUrl = null;
        }
    },
    extraReducers: (builder) => stripeReducer(builder)
});

export const { resetStripeState } = stripeSlice.actions;
export default stripeSlice;