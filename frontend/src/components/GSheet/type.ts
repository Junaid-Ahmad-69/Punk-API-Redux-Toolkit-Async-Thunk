export interface IGSheet {
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
