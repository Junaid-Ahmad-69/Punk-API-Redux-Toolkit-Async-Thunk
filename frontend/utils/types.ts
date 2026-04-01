export interface BeerState extends BeerFilter {
    data: [] | BeersList[];
    error: string | null;
    current: BeersList;
    page: number,
    limit: number,
    totalCount: number,
}

export interface BeerFilter {
    abv_gt?: null | string,
    ibu_gt?: null | string,
    ebc_gt?: null | string,
    food?: string,

}

export interface FetchBeersParams extends BeerFilter {
    page: number;
    per_page: number;

}

export interface FetchBeerParam {
    id: string;
}

export interface BeersList {
    abv: number;
    attenuation_level: number;
    boil_volume:
        { value: number, unit: string }
    brewers_tips: string;
    contributed_by: string;
    description: string;
    ebc: number;
    first_brewed: string;
    food_pairing: string[]
    ibu: number;
    id: string;
    image: string
    ingredients: {
        malt: {
            name: string;
            amount: {
                unit: string;
                value: number;
            },
        }[], hops: {
            name: string;
            add: string;
            attribute: string;
            amount: {
                value: number;
                unit: string;

            }
        }[], yeast: string
    }
    method:
        {
            mash_temp: {
                duration: string;
                temp: {
                    value: number;
                    unit: string;
                }
            }[], fermentation: {
                temp: {
                    value: number;
                    unit: string;
                }
            }, twist: null
        }
    name: string;
    ph: number;
    srm:
        number;
    tagline:
        string;
    target_fg:
        number;
    target_og:
        number;
    volume:
        { value: number, unit: string },
    note?: {
        id: string;
        note: string;
    }
}

export interface LoaderState {
    requestCount: number;
    isLoading: boolean;
}

export interface UserInfo {
    name?: string;
    email: string;
    password?: string;
    token?: string;
    picture?: string;
}


export interface UserAuth {
    user: UserInfo | null
    error: string | null;
}

export interface Column<T> {
    title: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
}

export interface BeerWithNotes  extends BeersList{
    note: {
        id: string;
        note: string;
    };
}

export interface CartListItems extends BeersList{
    price: number,
    productQty: number,
}

export interface CartListsProps {
    cartLists: CartListItems[];
    cartTotal: number;
}

export interface Note {
    id: string;
    note: string;
}

export interface NoteState {
    notes: Note[]
}


export interface WishlistState {
    items: BeersList[];
}