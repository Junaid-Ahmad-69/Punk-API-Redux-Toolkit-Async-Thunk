import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type {Column} from "../../../utils/types.ts";


export function DataTable<T>({
                                 columns,
                                 data,
                                 onRowClick,
                             }: {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map(col => (
                        <TableHead className="font-semibold" key={col.title}>{col.title}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((row, idx) => (
                    <TableRow
                        key={idx}
                        className={onRowClick ? "cursor-pointer" : ""}
                        onClick={() => onRowClick?.(row)}
                    >
                        {columns.map(col => (
                            <TableCell key={col.title}>
                                {col.render ? col.render(row) : (row[col.accessor!] as never)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
