import {createSlice} from '@reduxjs/toolkit';
import {beerReducer} from "@/features/beer/reducer.ts";
import type {BeerState} from "../../../utils/types.ts";



const initialState: BeerState = {
    data: [],
    loading: false,
    error: null,
    current: {
        abv: 0,
        attenuation_level: 0,
        boil_volume: {
            value: 0,
            unit: ''
        },
        brewers_tips: '',
        contributed_by: '',
        description: '',
        ebc: 0,
        first_brewed: '',
        food_pairing: [],
        ibu: 0,
        id: 0,
        image: '',
        ingredients: {
            malt: [],
            hops: [],
            yeast: ''
        },
        method: {
            mash_temp: [],
            fermentation: {
                temp: {
                    value: 0,
                    unit: ''
                }
            },
            twist: null
        },
        name: '',
        ph: 0,
        srm: 0,
        tagline: '',
        target_fg: 0,
        target_og: 0,
        volume: {
            value: 0,
            unit: ''
        }
    },
};


const beerSlice = createSlice({
    name: 'beer',
    initialState,
    reducers: {},
    extraReducers: (builder) => beerReducer(builder)
});

export default beerSlice;