
import * as React from "react";
import { Button} from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";


interface ButtonProps {
    loading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const GButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ loading = false, onClick, disabled= false, loadingText, children, leftIcon, rightIcon, className, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                onClick={onClick}
                className={cn("relative cursor-pointer hover:bg-transparent hover:text-black flex items-center justify-center gap-2", className)}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="animate-spin h-4 w-4" />}
                {!loading && leftIcon && leftIcon}
                {loading ? (loadingText || children) : children}
                {!loading && rightIcon && rightIcon}
            </Button>
        );
    }
);


export default GButton;
