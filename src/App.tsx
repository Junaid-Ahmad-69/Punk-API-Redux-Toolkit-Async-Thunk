import {Route, Routes} from "react-router";
import AuthLogin from "@/components/Auth";
import Home from "@/container/home/home.tsx";
import PublicRoute from "../Routes/PublicRoute.tsx";
import PrivateRoute from "../Routes/PrivateRoute.tsx";
import ViewBeer from "@/container/view-beer/view-beer.tsx";
import {HomeRoute, LoginRoute, ViewBeerDetail} from "../Routes/Route.tsx";
import {NotFound} from "@/container/NotFound";


function App() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path={LoginRoute} Component={AuthLogin} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path={HomeRoute} Component={Home} />
                <Route path={ViewBeerDetail} Component={ViewBeer} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
