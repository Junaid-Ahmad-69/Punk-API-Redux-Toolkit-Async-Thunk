import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton, useSidebar,
} from "@/components/ui/sidebar";
import {Home, Heart} from "lucide-react"

import {HomeRoute, Wishlist} from "../../../Routes/Route.tsx";
import GDropdown from "@/components/Dropdown/dropdown.tsx";
import Logo from '../../../public/logo.png'
import {useLocation} from "react-router";
const items = [
    {
        title: "Home",
        url: HomeRoute,
        icon: Home,
    },
    {
        title: "Wishlist",
        url: Wishlist,
        icon: Heart,
    },
]

const AppSidebar = () => {
    const location = useLocation();
    const isActive = (url: string) => location.pathname === url;

    const { open } = useSidebar();
    return (
        <Sidebar collapsible="icon" side="left" variant="sidebar">
            <SidebarHeader>
                <div className={`flex text-center justify-center w-full ${open ? 'p-2' : 'pt-4'} gap-4 items-center`}>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="h-6 w-6"
                    />
                    {open && <div className=" text-yellow-500 text-2xl font-bold">Punk Beer</div>}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild  data-active={isActive(item.url)}>
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

                <SidebarFooter>
                    <div className={`${open && 'p-4'}`}>
                        <GDropdown/>
                    </div>
                </SidebarFooter>

        </Sidebar>
    );
}

export default AppSidebar;