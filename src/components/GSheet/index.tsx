import {Button} from "@/components/ui/button"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
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

const GSheet= ({
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
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    {title && <SheetTitle className={cn(titleClass)}>{title}</SheetTitle>}
                    {description && <SheetDescription className={cn(descriptionClass)}>{description}</SheetDescription>}
                </SheetHeader>
                {content}
                <SheetFooter>
                    {cancelText && <SheetClose asChild>
                        <Button variant="outline">{cancelText }</Button>
                    </SheetClose>}
                    {confirmText && <Button onClick={handleSave}>{confirmText}</Button>}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default GSheet;