import { ReactNode, useContext, useState, createContext } from "react";

export const MyContext = createContext(undefined);

export const MyProvider = ({ children }) => {
    const [provider, setProvider] = useState(undefined);
    return <MyContext.Provider value={{ provider, setProvider }}>
        {children}
    </MyContext.Provider>
}

// export const useProviderContext = () => {
//     const context = useContext(MyContext);
//     if (context === undefined) {
//         throw new Error('useMyContext must be used within a MyProvider');
//     }
//     return context;
// };