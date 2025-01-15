import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react"
import {Bounce, toast} from "react-toastify";

type ContextProviderProps = {
    children: React.ReactNode
}

interface AppContextProps {
    isLoggedIn:boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    accessToken:string | null;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
    showToast: (props:showToastType) => void;
}

type showToastType = {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error'
}

const AppContext = createContext<AppContextProps | null>(null)


export const ContextProvider = ({ children }: ContextProviderProps) => {

    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!accessToken)

    function showToast({message,type}:showToastType) {
        toast(message, {
            position: "top-right",
            type:type,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const ContextProviderValue:AppContextProps = {
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken,
        showToast

    };

    return (
        <AppContext.Provider value={ContextProviderValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error("useAppContext must be used within AppContext")
    }
    return context;
}
