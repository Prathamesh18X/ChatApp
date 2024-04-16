import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
const useLogin =()=>{
    const {setAuthUser} = useAuth();
    //step 3 : crete useState for Loading state
    const [loading , setLoading] = useState(false);
    //step 1: Create a login function , which takes input from signup form.
    const login = async({userName ,password}) => {
        const success = handleInputErrors({userName,password});
        if(!success) return
    
    //step 4 : in Loading state , fetch API from backend
    setLoading(true);
        try {
            //step 4.1 : fetch API
            const res = await fetch("/api/auth/login",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({userName ,password})
            })

            //step 4.2 : handle response
            const data = await res.json()
            // console.log('here is data from signup api : ' ,data); // --> Testing

            
            //step 4.3 : if signup is successfull , set localstorage else handle error
            if(data.success){
                toast.success(data.success + ", " + data.userName)
                localStorage.setItem("authChatUser",JSON.stringify(data))

                //step 4.4 : set authUser to authContext 
                setAuthUser(data);

            }else{
                throw new Error(data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }
    return {loading,login}
}

export default useLogin

//step 2 : Create a function to handle/Validate input errors
const handleInputErrors = ({userName ,password}) => {
    if (!userName || !password) {   
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}