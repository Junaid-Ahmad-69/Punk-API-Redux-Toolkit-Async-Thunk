import {createAsyncThunk} from "@reduxjs/toolkit";
import {clearSessionStorage} from "../../../utils/helper.ts";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            // In a real app, you would call your Google auth API here
            // For demo, we'll just store the user data
            return userData;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            clearSessionStorage('token')
            return null;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);