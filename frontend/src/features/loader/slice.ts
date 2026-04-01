import {createSlice} from '@reduxjs/toolkit';
import type {LoaderState} from "../../../utils/types.ts";
import {loaderReducer} from "@/features/loader/reducer.ts";

const initialState: LoaderState = {
    isLoading: false,
    requestCount: 0
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {},
    extraReducers: (builder) => loaderReducer(builder)
});


export default loaderSlice;