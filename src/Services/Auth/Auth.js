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