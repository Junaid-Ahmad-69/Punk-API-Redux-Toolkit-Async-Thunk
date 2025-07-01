import {Button} from "@/components/ui/button.tsx";
import {googleLogout} from "@react-oauth/google";


function GoogleActionSignOut() {
    return <Button onClick={googleLogout}>Sign Out</Button>
}
export default GoogleActionSignOut;