import axiosInstance from './axiosInstance';

export const BeerService = {
    getBeerList: async (filters : {page: number}) => {
        const response = await axiosInstance.get(`/beers`, {
            params: filters
        });
        return response.data;
    },
    getBeer: async (params : {id: string}) => {
        const response = await axiosInstance.get(`/beers/${params.id}`);
        return response.data;
    },

};

