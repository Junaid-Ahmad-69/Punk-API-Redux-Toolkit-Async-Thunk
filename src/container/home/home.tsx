import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {fetchBeers} from "@/features/beer/actions.ts";
import {DataTable} from "@/components/Table";
import PaginationList from "@/components/Pagination";
import {useNavigate} from "react-router";
import {ViewBeerDetail} from "../../../Routes/Route.tsx";
import {setABV, setPage, setIBU, setEBC, setFood} from "@/features/beer/slice.ts";
import Filters from "@/components/Filters";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import NoBeerPlaceholder from "../../assets/images/home/no-beer.svg"
import type {BeersList, BeerWithNotes, Column} from "../../../utils/types.ts";
import {Pencil, Plus, Trash2} from "lucide-react";
import GPopover from "@/components/GPopover";
import GButton from "@/components/Button";
import GTooltip from "@/components/GTooltip";
import GDialog from "@/components/GDialog";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {updateNote, deleteNote} from "@/features/note/slice.ts";

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
    const {notes} = useSelector((state: RootState) => state.noteReducer)

    const [tableRow, setTableRow] = useState<BeerWithNotes[]>([])
    const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
    const [noteModalOpen, setNoteModalOpen] = useState<boolean>(false);
    const [noteId, setNoteId] = useState<string | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const noteText = useRef<HTMLInputElement>(null);


    const handleChange = (value: number) => dispatch(setPage(value))
    const handleNavigate = (id: string) => navigate(ViewBeerDetail.replace(":id", id));

    const handleOpenNoteModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, action: "add" | "edit" | "delete") => {
        e.stopPropagation()
        setNoteId(id)
        if (action === "delete") {
            setOpenDeleteModal(true);
            return;
        }
        const row = tableRow.find(r => r.id === id);
        setNoteModalOpen(true);
        setTimeout(() => {
            if (noteText.current) {
                noteText.current.value = action === "edit" ? row?.note?.note || "" : "";
                noteText.current.focus();
            }
        }, 10);
    };

    const handleSaveNote = () => {
        if (!noteId) return
        dispatch(updateNote({
            id: noteId,
            note: noteText?.current?.value ?? ""
        }));
    }

    const handleDeleteNote = () => {
        if (!noteId) return
        dispatch(deleteNote({id: noteId}))
    }


    useEffect(() => {
        dispatch(fetchBeers({
            page,
            per_page: limit,
        }))
    }, []);

    useEffect(() => {
        if (data.length) {
            const updated = data.map(row => ({
                ...row,
                note: notes.find(n => n.id === row.id) ?? {id: row.id, note: "-"},
            }));
            setTableRow(updated);
        }
    }, [data, notes]);


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

    const beerColumns: Column<BeersList>[] = [
        {title: "ID", accessor: "id"},
        {title: "Name", accessor: "name"},
        {
            title: "Image",
            render: row => (
                <div className='w-20 h-20'>
                    <img
                        alt={row.name}
                        className='w-full h-full object-contain'
                        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${row.image}`}
                    />
                </div>
            ),
        },
        {title: "First Brewed", accessor: "first_brewed"},
        {title: "PH", accessor: "ph"},
        {title: "Tagline", accessor: "tagline"},
        {
            title: "Note",
            render: row => (row.note?.note)
        },
        {title: "EBC", accessor: "ebc"},

        {
            title: "Yeast",
            render: row => (row.ingredients.yeast),
        },
        {title: "SRM", accessor: "srm"},
        {
            title: "Actions",
            render: row => (
                <GPopover
                    open={openPopoverId === row.id}
                    onOpenChange={(val) => setOpenPopoverId(val ? row.id : null)}
                >
                    <div className="flex flex-col justify-center items-center gap-2">
                        {!row.note?.note || row.note.note === "-" ? (
                            <GTooltip text='Add Note' side="left">
                                <GButton
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenNoteModal(e, row.id, 'add')}
                                    className=" hover:bg-yellow-500 text-white hover:text-white flex items-center gap-2">
                                    <Plus/>
                                </GButton>
                            </GTooltip>
                        ) : (<>
                            <GTooltip text='Edit Note' side="left">
                                <GButton
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenNoteModal(e, row.id, 'edit')}
                                    className="flex items-center gap-2 hover:bg-yellow-500 text-white hover:text-white">
                                    <Pencil/>
                                </GButton>
                            </GTooltip>
                            <GTooltip text='Delete Note' side="left">
                                <GButton
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpenNoteModal(e, row.id, 'delete')}
                                    className="flex items-center gap-2 text-red-500 hover:bg-yellow-500 hover:text-red-500">
                                    <Trash2/>
                                </GButton>
                            </GTooltip>
                        </>)}
                    </div>
                </GPopover>),
        }
    ];


    function renderBeerDetails() {
        if (tableRow.length === 0) {
            return (
                <EmptyPlaceholder name={"beer"} url={NoBeerPlaceholder}/>
            )
        } else {
            return <DataTable columns={beerColumns} data={tableRow} onRowClick={(row) => handleNavigate(row.id)}
            />
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                <GDialog
                    open={noteModalOpen}
                    titleClass="text-red-500 text-2xl"
                    descriptionClass="text-slate-600 text-lg"
                    onOpenChange={setNoteModalOpen}
                    handleSave={() => {
                        handleSaveNote()
                        setNoteModalOpen(false)
                    }}
                    content={
                        <>
                            <Label htmlFor="addNote">Add Note</Label>
                            <Input
                                ref={noteText}
                                id="addNote"
                                className="h-8 w-full"
                                placeholder={"Enter note..."}
                            />
                        </>
                    }
                    title="Added Your Note"
                    description="Please Enter the detail note for the beer."
                />
                <GDialog
                    open={openDeleteModal}
                    titleClass="text-red-500 text-2xl"
                    descriptionClass="text-slate-600 text-lg"
                    onOpenChange={setOpenDeleteModal}
                    handleSave={() => {
                        handleDeleteNote()
                        setOpenDeleteModal(false)
                    }}
                    title="Delete Note"
                    description="Are you sure you want to delete this note?"
                />

            </div>
        </>
    )
}
export default Home