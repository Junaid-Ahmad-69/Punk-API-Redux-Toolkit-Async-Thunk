import {type ActionReducerMapBuilder, isAnyOf, type PayloadAction} from "@reduxjs/toolkit";
import type {UserAuth, UserInfo} from "../../../utils/types.ts";
import {loginWithEmail, loginWithGoogle} from "@/features/auth/actions.ts";

export const userReducer = (builder: ActionReducerMapBuilder<UserAuth>)=> {
    builder
        .addMatcher(
            isAnyOf(loginWithEmail.fulfilled, loginWithGoogle.fulfilled),
            (state, action: PayloadAction<UserInfo>) => {
                state.user = action.payload;
                state.error = null;
            }
        )
        .addMatcher(
            (action): action is PayloadAction<string> & { type: string } =>
                [loginWithEmail.rejected.type, loginWithGoogle.rejected.type].includes(action.type),
            (state, action) => {
                state.error = action.payload || 'Unknown error occurred';
            }
        );
}