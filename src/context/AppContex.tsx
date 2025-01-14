import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react"

type ContextProviderProps = {
    children: React.ReactNode
}

interface AppContextProps {
    isLoggedIn:boolean;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | null>(null)


export const ContextProvider = ({ children }: ContextProviderProps) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const ContextProviderValue:AppContextProps = {
        isLoggedIn,
        setIsLoggedIn
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
