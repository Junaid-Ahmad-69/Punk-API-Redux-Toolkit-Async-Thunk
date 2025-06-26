import axiosInstance from './axiosInstance';
import type {FetchBeerParam, FetchBeersParams} from "../../utils/types.ts";
import {cleanParams} from "../../utils/helper.ts";

export const BeerService = {
    getBeerList: async (params: FetchBeersParams) => {
        const response = await axiosInstance.get(`/beers`, {
            params: cleanParams(params)
        });
        return response.data;
    },
    getBeer: async (params : FetchBeerParam) => {
        const response = await axiosInstance.get(`/beers/${params.id}`);
        return response.data;
    },

};

