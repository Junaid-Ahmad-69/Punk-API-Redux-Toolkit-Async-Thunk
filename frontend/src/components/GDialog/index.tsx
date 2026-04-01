import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {cn} from "@/lib/utils.ts";
import type {IGDialog} from "@/components/GDialog/type.ts";

const GDialog = ({
                     open,
                     onOpenChange,
                     content,
                     title,
                     description,
                     cancelText,
                     confirmText,
                     handleSave,
                     descriptionClass,
                     titleClass
                 }: IGDialog) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {title && <DialogTitle className={cn(titleClass)}>{title}</DialogTitle>}
                    {description &&
                        <DialogDescription className={cn(descriptionClass)}>{description}</DialogDescription>}
                </DialogHeader>
                {content}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{cancelText || "Cancel"}</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>{confirmText || "Confirm"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default GDialog
