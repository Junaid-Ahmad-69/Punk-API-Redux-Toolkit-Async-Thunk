import type {FetchBeersParams} from "./types.ts";

export const cleanParams = (params: FetchBeersParams) =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) =>
            value !== '' && value !== null && value !== undefined
        )
    );