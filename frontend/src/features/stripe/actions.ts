import {createAsyncThunk} from "@reduxjs/toolkit";
import {StripeService} from "@/api/stripe.service.ts";
import type {BeersList} from "../../../utils/types.ts";

export const initiatePayment= createAsyncThunk(
    'stripe/createCheckoutSession',
    async (products :BeersList[], { rejectWithValue }) => {
        try {
            return await StripeService.createCheckoutSession(products);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);