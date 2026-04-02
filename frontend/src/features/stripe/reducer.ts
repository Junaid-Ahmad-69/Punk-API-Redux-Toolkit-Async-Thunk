import { initiatePayment } from "@/features/stripe/actions.ts";
import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import type { StripeState } from "../../../utils/types.ts";

export const stripeReducer = (builder: ActionReducerMapBuilder<StripeState>) => {
    builder
        .addCase(initiatePayment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(initiatePayment.fulfilled, (state, action: PayloadAction<{ url: string } | void>) => {
            state.loading = false;
            if (action.payload && typeof action.payload === 'object' && 'url' in action.payload) {
                state.checkoutUrl = action.payload.url;
                window.location.assign(action.payload.url);
            }
        })
        .addCase(initiatePayment.rejected, (state, action) => {
            state.loading = false;
            state.error = (action.payload as string) || action.error.message || "Payment failed";
        });
};