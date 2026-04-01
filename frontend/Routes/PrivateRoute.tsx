import {Navigate, Outlet} from "react-router";
import {useEffect, useState} from "react";
import {getSessionStorage} from "../utils/helper.ts";

const PrivateRoute = () => {
    const [auth, setAuth] = useState<null | object>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const user = getSessionStorage('user');
        setAuth(user ? JSON.parse(user) : null);
        setLoading(false);
    }, []);
    if (loading) return null;
    return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;