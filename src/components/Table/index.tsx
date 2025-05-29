import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type {BeersList} from "../../../utils/types.ts";

export const DataTable = ({heading, list, handleRowClick}: { heading: string[], list: BeersList[], handleRowClick: (id: string)=> void }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {heading.map(title => <TableHead className="font-[Lato-Bold]" key={title}>{title}</TableHead>)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {list.map(item => {
                    return (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="cursor-pointer" onClick={()=> handleRowClick(JSON.stringify(item.id))}>{item.name}</TableCell>
                            <TableCell><img width={20} height={20}
                                            src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/images/${item.image}`}
                                            alt={item.name}/></TableCell>
                            <TableCell>{item.first_brewed}</TableCell>
                            <TableCell>{item.ph}</TableCell>
                            <TableCell>{item.tagline}</TableCell>
                            <TableCell>{item.ingredients.yeast}</TableCell>
                            <TableCell>{item.volume.value} Liters</TableCell>
                            <TableCell>{item.ibu}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>

    );
};
