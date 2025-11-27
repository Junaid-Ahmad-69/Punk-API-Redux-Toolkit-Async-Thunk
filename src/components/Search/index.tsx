import {
    Command,
    CommandInput,
} from "@/components/ui/command"
import type {ISearch} from "@/components/Search/type.ts";

const InputSearch =   ({setQuery}: ISearch) => {
    return (
        <Command className="rounded-lg border md:min-w-[450px]">
            <CommandInput  onValueChange={(value)=>setQuery(value)} placeholder="Type an id to search..." />
        </Command>
    )


}
export default InputSearch;