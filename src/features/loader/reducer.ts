import type {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import type {LoaderState} from "../../../utils/types.ts";

export const loaderReducer = (builder: ActionReducerMapBuilder<LoaderState>) => {
    builder
        // Generic matcher for all pending actions
        .addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.requestCount += 1;
                state.isLoading = true;
            }
        )
        // Generic matcher for all fulfilled/rejected actions
        .addMatcher(
            (action) => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
            (state) => {
                state.requestCount = Math.max(0, state.requestCount - 1);
                state.isLoading = state.requestCount > 0;
            }
        );
}