import { useState, createContext } from "react";

export const UserContext = createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

export const UserContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('token', token)
        setToken(token);
    }


    const logoutHandler = () => {
        localStorage.setItem('token', '')
        setToken(null);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <UserContext.Provider value={contextValue} >{props.children}</UserContext.Provider>
}

export default UserContext