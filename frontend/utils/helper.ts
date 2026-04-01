import type {FetchBeersParams} from "./types.ts";

export const cleanParams = (params: FetchBeersParams) =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) =>
            value !== '' && value !== null && value !== undefined
        )
    );
export const getSessionStorage = (key: string): string | null => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem(key);
    }
    return null;
};

export const setSessionStorage = (key: string, value: unknown): void => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
};


export const clearSessionStorage = (key:string) =>{
    sessionStorage.removeItem(key)
}

export  const formattedCurrency = (amount: number)=>{
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
