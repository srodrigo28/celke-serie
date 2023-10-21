import { createContext, useEffect, useState } from "react";

const Context = createContext();

function AuthProvider({children}){

    const [ authenticated, setAuthenticated] = useState(true)

    useEffect( () => {
        const getLogin = async () => {
            const token = localStorage.getItem()
        }

        getLogin();
    }, []) 

    return(
        <Context.Provider value={{ authenticated }}>
            { children }
        </Context.Provider>
    )
}

export {Context, AuthProvider};