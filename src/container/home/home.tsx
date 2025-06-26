import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {fetchBeers} from "@/features/beer/actions.ts";
import {Loader} from "@/components/Loader";
import {DataTable} from "@/components/Table";
import PaginationList from "@/components/Pagination";
import {HomeHeading} from "../../../constants/data.tsx";
import {useNavigate} from "react-router";
import {ViewBeerDetail} from "../../../Routes/Route.tsx";
import {setABV, setPage, setIBU} from "@/features/beer/slice.ts";
import Filters from "@/components/Filters";
import {useDebouncedEffect} from "@/hooks/useHooks.ts";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error, page, data, limit, totalCount, abv_gt, ibu_gt} = useSelector((state: RootState) => state.beer);

    useEffect(() => {
        dispatch(fetchBeers({
            page,
            per_page : limit,
            abv_gt,
            ibu_gt
        }))
    }, []);

    useDebouncedEffect(() => {
        dispatch(fetchBeers({
            page,
            per_page :limit,
            abv_gt,
            ibu_gt
        }))
    }, [page, limit, abv_gt, ibu_gt], 500, true);

    if (loading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleChange = (value: number) => dispatch(setPage(value))
    const handleNavigate = (id: string) => navigate(ViewBeerDetail.replace(":id", id))

    return (
        <div className="container mx-auto py-24">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
            <Filters
                data={[
                    {
                        type: 'number',
                        name: 'ABV',
                        label: 'Search By ABV',
                        placeholder: 'Search by ABV....',
                        value: abv_gt ?? '',
                        handleChangeFilter: (value: string) => dispatch(setABV(value)),
                    },
                    {
                        type: 'number',
                        name: 'IBU',
                        label: 'Search By IBU',
                        placeholder: 'Search by IBU....',
                        value: ibu_gt ?? '',
                        handleChangeFilter: (value: string) => dispatch(setIBU(value)),
                    }
                ]}
            />
            </div>
            <DataTable heading={HomeHeading} list={data} handleRowClick={handleNavigate}/>
            <div className="my-12">
                {totalCount > limit &&
                    <PaginationList
                        limit={limit}
                        defaultPage={page}
                        totalCount={totalCount}
                        handleChange={handleChange}
                    />
                }
            </div>
        </div>
    )
}
export default Home