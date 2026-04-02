import axiosInstance from "@/api/axiosInstance.ts";
import type {BeersList} from "../../utils/types.ts";

export const StripeService = {
    createCheckoutSession : async (products: BeersList[]): Promise<void> => {
        const response = await axiosInstance.post(`http://localhost:8082/api/stripe/create-checkout-session`, {products})
        return  response.data

    }
}