export interface BeerState {
    data: [] | BeersList[];
    loading: boolean;
    error: string | null;
    current: BeersList;
}

export  interface FetchBeersParams {
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
