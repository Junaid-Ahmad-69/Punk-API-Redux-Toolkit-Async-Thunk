import {createSlice} from '@reduxjs/toolkit';
import {beerReducer} from "@/features/beer/reducer.ts";
import type {BeerState} from "../../../utils/types.ts";
import {REHYDRATE} from 'redux-persist';


const initialState: BeerState = {
    data: [],
    error: null,
    page: 1,
    limit: 10,
    totalCount: 420,
    /***** Filter States *****/
    abv_gt: null,
    ibu_gt: null,
    ebc_gt: null,
    food: '',

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
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setABV(state, action) {
            state.abv_gt = action.payload;
        },
        setIBU(state, action) {
            state.ibu_gt = action.payload;
        },
        setEBC(state, action) {
            state.ebc_gt = action.payload;
        },
        setFood(state, action) {
            state.food = action.payload;
        },
        // resetBeerState(state) {
        //     Object.assign(state, initialState);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(REHYDRATE, (_state, action) => {
                const payload = (action as { payload?: { beer?: BeerState } }).payload;
                if (payload?.beer) {
                    return {
                        ...payload.beer,
                        page: 1,
                        limit: 10,
                        abv_gt: null,
                        ibu_get: null,
                        ebc_gt: null,
                        food: '',
                    };
                }
                return _state
            });
        beerReducer(builder)
    }
});

export const {setPage, setABV, setIBU, setEBC, setFood} = beerSlice.actions;
export default beerSlice;
