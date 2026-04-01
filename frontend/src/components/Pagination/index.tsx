import {
    Pagination, PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import type {IPagination} from "@/components/Pagination/type.ts";

const PaginationList = ({
                            defaultPage,
                            handleChange,
                            totalCount,
                            limit
                        }: IPagination) => {
    const totalPages: number = Math.ceil(totalCount / limit);
    const MaxCountShow: number = 3;
    const pages: (number | string)[] = [];
    const start = Math.max(2, defaultPage - 1);
    const end = Math.min(totalPages - 1, defaultPage + 1);
    if (defaultPage) {
        pages.push(1);
    }
    if (defaultPage > MaxCountShow) {
        pages.push('...');
    }
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (defaultPage < totalPages - 2) {
        pages.push('...');
    }
    if (defaultPage <= totalPages) {
        pages.push(totalPages);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => handleChange(Math.max(1, defaultPage - 1))}
                    />
                </PaginationItem>

                {pages.map((item, i) => (
                    <PaginationItem key={i}>
                        {item === '...' ? (
                            <PaginationEllipsis/>
                        ) : (
                            <PaginationLink
                                className={`${
                                    defaultPage === item
                                        ? 'hover:bg-black hover:text-white bg-black text-white'
                                        : ''
                                } cursor-pointer`}
                                onClick={() => handleChange(+item)}
                            >
                                {item}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        className="cursor-pointer"
                        onClick={() => handleChange(Math.min(totalPages, defaultPage + 1))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationList;