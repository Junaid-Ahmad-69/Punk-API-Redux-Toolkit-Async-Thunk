import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {useEffect, useState} from "react";
import {fetchBeers} from "@/features/beer/actions.ts";
import {Loader} from "@/components/Loader";
import {DataTable} from "@/components/Table";
import PaginationList from "@/components/Pagination";
import {HomeHeading} from "../../../constants/data.tsx";
import {useNavigate} from "react-router";
import {ViewBeerDetail} from "../../../Routes/Route.tsx";

const Home = ()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error, data} = useSelector((state: RootState) => state.beer);

    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        dispatch(fetchBeers({page, per_page: 10}))
    }, [dispatch, page])

    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleChange = (value: number) => setPage(value)

    const handleNavigate= (id: string)=> navigate(ViewBeerDetail.replace(":id", id ))

    return (
        <div className="container mx-auto py-24">
            <DataTable heading={HomeHeading} list={data} handleRowClick={handleNavigate} />
            <div className="my-12">
                {data.length > ( data.length - 1 ) &&
                    <PaginationList
                        limit={data.length}
                        defaultPage={page}
                        totalCount={420}
                        handleChange={handleChange}
                    />}
            </div>
        </div>

    )
}
export default Home