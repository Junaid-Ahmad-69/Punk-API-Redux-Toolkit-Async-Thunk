import './loader.css'
import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";

export const Loader = () => {
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);
    if (!isLoading) return null;
    return <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-screen bg-black/30 z-40 "> <div className="loader"/></div>
}

