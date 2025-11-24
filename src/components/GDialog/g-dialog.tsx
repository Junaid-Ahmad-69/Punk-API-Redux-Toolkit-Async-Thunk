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

interface Props {
    open: boolean
    onOpenChange: (value: boolean) => void
    content?: React.ReactNode
    title?: string
    description?: string
    cancelText?: string
    confirmText?: string
    handleSave: () => void
    titleClass?: string
    descriptionClass?: string
}

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
                 }: Props) => {
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
