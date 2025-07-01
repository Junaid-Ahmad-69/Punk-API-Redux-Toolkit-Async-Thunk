import type {FetchBeersParams} from "./types.ts";

export const cleanParams = (params: FetchBeersParams) =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) =>
            value !== '' && value !== null && value !== undefined
        )
    );

export const setSessionStorage = (key:string, Item: string) =>{
    sessionStorage.setItem(key, Item);
}

export const getSessionStorage = (key:string) =>{
     return  sessionStorage.getItem(key) || null
}

export const clearSessionStorage = (key:string) =>{
    sessionStorage.removeItem(key)
}
