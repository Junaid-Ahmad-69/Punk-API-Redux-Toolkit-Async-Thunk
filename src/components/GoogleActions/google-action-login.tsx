import {useState} from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from "react-router";
import {ToasterMessage} from "@/components/Toast";
import {clearSessionStorage, getSessionStorage, setSessionStorage} from "../../../utils/helper.ts";
import {jwtDecode} from "jwt-decode";
import {HomeRoute} from "../../../Routes/Route.tsx";

function GoogleActionLogin() {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(
        getSessionStorage('user') || null
    );

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                    const userInfo = jwtDecode(credentialResponse.credential)
                    const setSession = {
                        token: credentialResponse.credential,
                        ...userInfo
                    }
                    setSessionStorage('user', JSON.stringify(setSession as never));
                    setToken(credentialResponse.credential);
                    ToasterMessage({
                        type: "success",
                        message: "Google Login Successful!",
                        description: "Welcome back!",
                    });
                    navigate(HomeRoute)
                }
                if (!token) return
            }}
            onError={() => {
                ToasterMessage({
                    type: "error",
                    message: "Login Failed!",
                    description: "There is some issue while logging in.",
                });
                clearSessionStorage('user')
                setToken(null);
            }}
        />
    );
}

export default GoogleActionLogin;