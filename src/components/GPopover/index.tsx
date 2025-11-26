import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {EllipsisVertical} from "lucide-react";

interface Props {
    open: boolean,
    onOpenChange: (value: boolean) => void,
    children: React.ReactNode,
}
const GPopover = ({open , onOpenChange, children}: Props) => {
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button className='cursor-pointer' onClick={(e)=> e.stopPropagation()} variant="outline">
                    <EllipsisVertical />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-12" onMouseLeave={()=> onOpenChange(false)}>
                {children}
            </PopoverContent>
        </Popover>
    )
}
export default GPopover
