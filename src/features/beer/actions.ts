import {createAsyncThunk} from "@reduxjs/toolkit";
import {BeerService} from "@/api/beer.service.ts";
import type {BeersList, FetchBeerParam, FetchBeersParams} from "../../../utils/types.ts";

export const fetchBeers= createAsyncThunk<BeersList[], FetchBeersParams, { rejectValue: string }>(
    'beer/getAllBeers',
    async (filters, { rejectWithValue }) => {
        try {
            return await BeerService.getBeerList(filters);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const fetchBeer= createAsyncThunk<BeersList, FetchBeerParam, { rejectValue: string }>(
    'beer/getBeer',
    async (params, { rejectWithValue }) => {
        try {
            return await BeerService.getBeer(params);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);