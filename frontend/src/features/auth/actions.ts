import {createAsyncThunk} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import type {UserInfo} from "../../../utils/types.ts";
import {setSessionStorage} from "../../../utils/helper.ts";
import {ToasterMessage} from "@/components/Toast";


export const loginWithEmail = createAsyncThunk(
    'auth/emailLogin',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const mockUser = {
                token: 'mock-email-token',
                name: 'Email User',
                email,
                password,
            };
            setSessionStorage('user', mockUser as never);
            ToasterMessage({
                type: "success",
                message: "Email Login Successful!",
                description: "Welcome back!",
            });
            return mockUser;
        } catch (error) {
            return rejectWithValue((error as Error).message || 'Login failed');
        }
    }
);

export const loginWithGoogle = createAsyncThunk(
    'auth/googleLogin',
    async (credential: string, { rejectWithValue }) => {
        try {
            const userInfo = jwtDecode(credential) as UserInfo;

            const googleSession = {
                token: credential,
                name: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture
            }
            setSessionStorage('user', googleSession as never)
            return googleSession;
        } catch (error) {
            return rejectWithValue((error as Error).message|| 'Invalid Google credential');
        }
    }
);