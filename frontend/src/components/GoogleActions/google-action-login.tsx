import {useState} from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from "react-router";
import {ToasterMessage} from "@/components/Toast";
import {clearSessionStorage, getSessionStorage} from "../../../utils/helper.ts";
import {HomeRoute} from "../../../Routes/Route.tsx";
import type {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";
import {loginWithGoogle} from "@/features/auth/actions.ts";

function GoogleActionLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [token, setToken] = useState<string | null>(
        getSessionStorage('user') || null
    );

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                    dispatch(loginWithGoogle(credentialResponse.credential))
                        .unwrap()
                        .then(() => {
                            ToasterMessage({
                                type: "success",
                                message: "Google Login Successful!",
                                description: "Welcome back!",
                            });
                            navigate(HomeRoute, {replace: true});
                        })
                        .catch((error) => {
                            ToasterMessage({
                                type: "error",
                                message: "Login Failed!",
                                description: error || "There was an issue logging in.",
                            });
                        });
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