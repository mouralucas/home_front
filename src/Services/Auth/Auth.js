import {Navigate, useLocation} from "react-router-dom";
import React from "react";

export const TOKEN_KEY = 'userToken';

// Stateless function are write with arrow
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const setToken = token => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
};

const RequireAuth = ({children}) => {
    let location = useLocation();

    if (!isAuthenticated()) {
        // Redirect them to the / page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{from: location}}/>;
    }

    return children;
}

export default RequireAuth;