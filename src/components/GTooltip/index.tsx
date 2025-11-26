import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface GTooltipProps {
    text: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    className?: string;
}

const GTooltip = ({ text, children, side = "top", align = "center", className }: GTooltipProps) => {
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
