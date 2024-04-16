import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogout = () =>{
    const {setAuthUser} = useAuth();
    //step 1 : create loading using useState
    const [loading , setLoading] = useState()

    //step 2 : create logout function handler
    const logout = async () =>{
        //step 2.1 : set loading (true)
        setLoading(true)

        //step 2.3 : fetch API
        try {
            const res = await fetch("/api/auth/logout",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            //step 2.4 : handle response and remove from local storage
            const data = await res.json();
            if(!data.error){
                localStorage.removeItem("authChatUser");
                window.location.reload();
                setAuthUser(null)
                toast.success("logout Successfully !")
            }else{
                toast.error(data.error)
                throw new Error(data.error)
            }

        } catch (error) {
            toast.error(error.message)
            
        } finally{
            //step 2.2 : set loading to (false)
            setLoading(false)
        }
    }
    return { loading, logout };
}

export default useLogout