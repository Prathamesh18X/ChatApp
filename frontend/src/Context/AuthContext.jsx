import { createContext, useContext,useState } from "react";
//step 1 : Create a context 
export const AuthContext = createContext();

//step 2 : Create a provider component
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("authChatUser")) || null);
    return (
        <AuthContext.Provider value={{authUser , setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
};
//step 3 : Create a custom hook
export const useAuth = () => {
    return useContext(AuthContext);
}