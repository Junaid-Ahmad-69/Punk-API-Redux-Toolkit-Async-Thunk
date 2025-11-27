export interface IGPopover {
    open: boolean,
    onOpenChange: (value: boolean) => void,
    children: React.ReactNode,
}