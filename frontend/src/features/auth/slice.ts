import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {UserAuth, UserInfo} from "../../../utils/types.ts";
import {userReducer} from "@/features/auth/reducer.ts";
import {clearSessionStorage} from "../../../utils/helper.ts";
import {ToasterMessage} from "@/components/Toast";


const getInitialUser = (): UserInfo | null => {
    const userData = sessionStorage.getItem('user');
    try {
        return userData ? JSON.parse(userData) as UserInfo : null;
    } catch {
        return null;
    }
};
const initialState: UserAuth = {
    user: getInitialUser(),
    error: null
}

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    clearSessionStorage('user');
    ToasterMessage({
        type: "success",
        message: "Logout Successful!",
        description: "Your account has been logged out.",
    });

    return null;
});

const userAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => userReducer(builder)
});

export const { clearError } = userAuthSlice.actions;
export default userAuthSlice;