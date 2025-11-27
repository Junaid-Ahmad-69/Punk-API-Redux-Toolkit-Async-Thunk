import {Route, Routes} from "react-router";
import AuthLogin from "@/components/Auth";
import Home from "@/container/home/home.tsx";
import PublicRoute from "../Routes/PublicRoute.tsx";
import PrivateRoute from "../Routes/PrivateRoute.tsx";
import ViewBeer from "@/container/view-beer/view-beer.tsx";
import {HomeRoute, LoginRoute, ViewBeerDetail, Wishlist as WishListRoute} from "../Routes/Route.tsx";
import {NotFound} from "@/container/not-found";
import DashboardLayout from "@/layouts/dashboard-layout.tsx";
import WishList from "@/container/wishlist/wishlist.tsx";


function App() {
    return (
        <Routes>
            <Route element={<PublicRoute/>}>
                <Route path={LoginRoute} Component={AuthLogin}/>
            </Route>
            <Route element={<PrivateRoute/>}>
                <Route element={<DashboardLayout/>}>
                    <Route path={HomeRoute} Component={Home}/>
                    <Route path={ViewBeerDetail} Component={ViewBeer}/>
                    <Route path={WishListRoute} Component={WishList}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
