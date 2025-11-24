import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";
import type {UserInfo} from "../../../utils/types.ts";
import Avatar from '../../../src/assets/images/avatar.png'
import Logout from "@/components/GoogleActions/logout.tsx";
import {useSidebar} from "@/components/ui/sidebar.tsx";

const GDropdown = () => {
    const {open} = useSidebar()
    const data: UserInfo | null = useSelector((state: RootState) => state.userAuth.user)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className='flex item-center gap-1'>
                    <img
                    src={data?.picture ?? Avatar}
                    alt={data?.name}
                    className="h-8 w-8 rounded-full"
                />
                    {open && (<div className='flex items-start flex-col'>
                        <span className="text-sm font-medium">{data?.name}</span>
                        <span className="text-sm font-medium truncate w-40">{data?.email}</span>
                    </div>)}
                </span>

            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end" className="w-40">
                <DropdownMenuItem onClick={() => console.log("Profile")}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Preferences")}>
                    Preferences
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Settings")}>
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => console.log("Logout user")}
                >
                    <Logout btnClass={"text-red-500 bg-transparent p-0  h-6 pb-1 font-medium hover:bg-transparent"}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default GDropdown