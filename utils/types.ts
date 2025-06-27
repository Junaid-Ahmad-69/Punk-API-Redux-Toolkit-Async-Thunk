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

export  interface FetchBeersParams extends BeerFilter {
    page: number;
    per_page: number;

}
export  interface FetchBeerParam {
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
    id: number;
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
        { value: number, unit: string }
}

export interface LoaderState {
    requestCount: number;
    isLoading: boolean;
}