import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationList = ({defaultPage, handleChange, totalCount, limit}: {limit: number, defaultPage: number, totalCount: number, handleChange: (page: number) => void}) => {
    const totalPages: number = Math.ceil(totalCount / limit);
    const MaxCountShow: number = 3;
    const pages = [];

    if (defaultPage <= MaxCountShow) {
        for (let i = 1; i <= MaxCountShow; i++) {
            pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
    } else if (defaultPage >= totalPages - MaxCountShow + 1) {
        pages.push(1);
        for (let i = totalPages - MaxCountShow + 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);
        pages.push('...');
        pages.push(defaultPage - 1);
        pages.push(defaultPage);
        pages.push(defaultPage + 1);
        pages.push(totalPages);
    }
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" onClick={(prevState)=> handleChange(+prevState - 1 )}/>
                </PaginationItem>
                <PaginationItem>
                    {pages.map((item, i)=> {
                        return (
                            <PaginationLink key={i} className="cursor-pointer" onClick={()=> handleChange(+item)}>{item}</PaginationLink>
                        )
                    })}
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext className="cursor-pointer" onClick={(prevState)=> handleChange(+prevState + 1 )}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}
export default PaginationList