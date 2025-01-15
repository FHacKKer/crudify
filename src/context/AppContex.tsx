import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react"

type ContextProviderProps = {
    children: React.ReactNode
}

interface AppContextProps {
    isLoggedIn:boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    accessToken:string | null;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProps | null>(null)


export const ContextProvider = ({ children }: ContextProviderProps) => {

    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!accessToken)

    const ContextProviderValue:AppContextProps = {
        isLoggedIn,
        setIsLoggedIn,
        accessToken,
        setAccessToken
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
