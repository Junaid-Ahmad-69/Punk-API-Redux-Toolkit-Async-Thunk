import {Outlet} from "react-router";
import AppSidebar from "@/components/Sidebar/sidebar.tsx";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar/>
                <main className="flex-1">
                    <SidebarTrigger className='cursor-pointer'/>
                    <div className=' p-8'>
                        <Outlet/>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    );
}

export default DashboardLayout;