import {fetchBeer, fetchBeers} from './actions';
import type {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import type { BeerState} from "../../../utils/types.ts";

export const beerReducer = (builder: ActionReducerMapBuilder<BeerState>) => {
    builder
        .addCase(fetchBeers.pending, (state) => {
            state.error = null;
        })
        .addCase(fetchBeers.fulfilled, (state, action) => {
            state.data = action.payload;
            state.error = null;
        })
        .addCase(fetchBeers.rejected, (state, action) => {
            state.error = action.payload as string;
        })
        .addCase(fetchBeer.pending, (state) => {
            state.error = null;
        })
        .addCase(fetchBeer.fulfilled, (state,action) => {
            state.current = action.payload;
            state.error = null;
        })
        .addCase(fetchBeer.rejected, (state, action) => {
            state.error = action.payload as string;
        });
};