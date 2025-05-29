import Home from "@/container/home/home.tsx";
import {Route, Routes} from "react-router";
import ViewBeer from "@/container/view-beer/view-beer.tsx";
import {HomeRoute, ViewBeerDetail} from "../Routes/Route.tsx";


function App() {
    return (
        <Routes>
            <Route  path={HomeRoute} Component={Home} />
            <Route  path={ViewBeerDetail} Component={ViewBeer} />
        </Routes>
    )
}

export default App
