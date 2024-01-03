import {Navigate, useLocation} from "react-router-dom";
import React from "react";

export const TOKEN_KEY = 'userToken';
// export const STORAGE_TYPE = sessionStorage;
export const STORAGE_TYPE = localStorage;

// Stateless function are write with arrow
export const isAuthenticated = () => STORAGE_TYPE.getItem(TOKEN_KEY) !== null;
export const getToken = () => STORAGE_TYPE.getItem(TOKEN_KEY);

export const setToken = (token: string) => {
    STORAGE_TYPE.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    STORAGE_TYPE.removeItem(TOKEN_KEY);
};

const RequireAuth = ({children}: {children: any}) => {
    let location = useLocation();

    if (!isAuthenticated()) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default RequireAuth;