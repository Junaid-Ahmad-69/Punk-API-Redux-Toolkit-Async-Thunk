import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {logoutUser} from "@/features/auth/slice.ts";
import {LoginRoute} from "../../../Routes/Route.tsx";
import type {AppDispatch} from "../../../store/store.ts";



function Logout({btnClass}: {btnClass?: string}) {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()


    const handleLogout = () => {
        dispatch(logoutUser())
        navigate(LoginRoute, {replace: true})
    }

    return <Button className={`cursor-pointer ${btnClass}`} onClick={handleLogout}>Logout</Button>
}
export default Logout;