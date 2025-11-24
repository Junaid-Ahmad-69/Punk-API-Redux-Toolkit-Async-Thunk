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
import Logout from "@/components/GoogleActions/logout.tsx";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import NoBeerPlaceholder from "../../assets/images/home/no-beer.svg"

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


    useEffect(() => {
        const interval = setTimeout(() => {
            dispatch(fetchBeers({
                page,
                per_page: limit,
                abv_gt,
                ibu_gt,
                ebc_gt,
                food,
            }))
        }, 500)
        return () => {
            clearTimeout(interval)
        }
    }, [page, limit, abv_gt, ibu_gt, ebc_gt, food]);



    /*
    NEED WHEN YOU COMPLETE OPTIMIZED THE REQUEST WITHOUT PERSIST FILTER
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
     */

    function renderBeerDetails() {
        if (data.length === 0) {
            return (
                <EmptyPlaceholder name={"beer"} url={NoBeerPlaceholder}/>
            )
        } else {
            return (
                <>
                    <DataTable heading={HomeHeading} list={data} handleRowClick={handleNavigate}/>

                </>
            )
        }
    }


    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleChange = (value: number) => dispatch(setPage(value))
    const handleNavigate = (id: string) => navigate(ViewBeerDetail.replace(":id", id));

    return (
        <>
            <div className="container mx-auto py-4">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <Filters
                        data={[
                            {
                                type: 'number',
                                name: 'ABV',
                                label: 'Search By ABV',
                                placeholder: 'Search by ABV....',
                                value: abv_gt ?? '',
                                handleChangeFilter: (e) => dispatch(setABV(e.target.value)),
                            },
                            {
                                type: 'number',
                                name: 'IBU',
                                label: 'Search By IBU',
                                placeholder: 'Search by IBU....',
                                value: ibu_gt ?? '',
                                handleChangeFilter: (e) => dispatch(setIBU(e.target.value)),
                            },
                            {
                                type: 'number',
                                name: 'EBC',
                                label: 'Search By EBC',
                                placeholder: 'Search by EBC....',
                                value: ebc_gt ?? '',
                                handleChangeFilter: (e) => dispatch(setEBC(e.target.value)),
                            },
                            {
                                type: 'text',
                                name: 'Food',
                                label: 'Search By Food',
                                placeholder: 'Search by Food....',
                                value: food ?? '',
                                handleChangeFilter: (e) => dispatch(setFood(e.target.value)),
                            }
                        ]}
                    />
                </div>
                {renderBeerDetails()}
                <div className="my-12">
                    {!!data.length && totalCount > limit &&
                        <PaginationList
                            limit={limit}
                            defaultPage={page}
                            totalCount={totalCount}
                            handleChange={handleChange}
                        />
                    }
                </div>
            </div>
        </>
    )
}
export default Home