import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {fetchBeers} from "@/features/beer/actions.ts";
import {DataTable} from "@/components/Table";
import PaginationList from "@/components/Pagination";
import {HomeHeading} from "../../../constants/data.tsx";
import {useNavigate} from "react-router";
import {ViewBeerDetail} from "../../../Routes/Route.tsx";
import {setABV, setPage, setIBU, setEBC, setFood} from "@/features/beer/slice.ts";
import Filters from "@/components/Filters";
import {useDebouncedEffect} from "@/hooks/useHooks.ts";


const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {
        error,
        page,
        data,
        limit,
        totalCount,
        abv_gt,
        ibu_gt,
        ebc_gt,
        food
    } = useSelector((state: RootState) => state.beer);

    useEffect(() => {
        dispatch(fetchBeers({
            page,
            per_page: limit,
        }))
    }, []);

    useDebouncedEffect(() => {
        dispatch(fetchBeers({
            page,
            per_page: limit,
            abv_gt,
            ibu_gt,
            ebc_gt,
            food,
        }))
    }, [page, limit, abv_gt, ibu_gt, ebc_gt, food], 500, true);

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleChange = (value: number) => dispatch(setPage(value))
    const handleNavigate = (id: string) => navigate(ViewBeerDetail.replace(":id", id));

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
                        },
                        {
                            type: 'number',
                            name: 'EBC',
                            label: 'Search By EBC',
                            placeholder: 'Search by EBC....',
                            value: ebc_gt ?? '',
                            handleChangeFilter: (value: string) => dispatch(setEBC(value)),
                        },
                        {
                            type: 'text',
                            name: 'Food',
                            label: 'Search By Food',
                            placeholder: 'Search by Food....',
                            value: food ?? '',
                            handleChangeFilter: (value: string) => dispatch(setFood(value)),
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