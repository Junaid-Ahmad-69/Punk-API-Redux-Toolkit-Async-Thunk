import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type {IGTooltip} from "@/components/GTooltip/type.ts";



const GTooltip = ({ text, children, side = "top", align = "center", className }: IGTooltip) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className={className}>{children}</div>
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default GTooltip;
