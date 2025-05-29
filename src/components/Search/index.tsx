import {
    Command,
    CommandInput,
} from "@/components/ui/command"

const InputSearch =   ({setQuery}: {q: number, setQuery: (val: string) => void}) => {
    return (
        <Command className="rounded-lg border md:min-w-[450px]">
            <CommandInput  onValueChange={(value)=>setQuery(value)} placeholder="Type an id to search..." />
        </Command>
    )


}
export default InputSearch;