import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";
const useSignup =()=>{
    const {setAuthUser} = useAuth();
    //step 3 : crete useState for Loading state
    const [loading , setLoading] = useState(false);
    //step 1: Create a signup function , which takes input from signup form.
    const signUp = async({fullName , userName , confirmPassword , password, gender}) => {
        const success = handleInputErrors({fullName , userName , confirmPassword , password, gender});
        if(!success) return
    
    //step 4 : in Loading state , fetch API from backend
    setLoading(true);
        try {
            //step 4.1 : fetch API
            const res = await fetch("/api/auth/signup",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({fullName , userName , confirmPassword , password, gender})
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
    return {loading,signUp}
}

export default useSignup

//step 2 : Create a function to handle/Validate input errors
const handleInputErrors = ({fullName , userName , confirmPassword , password, gender}) => {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}
    if(password.length < 6){
        toast.error("Password must be at least 6 characters");
        return false
    }
    if (confirmPassword !== password) {
        toast.error("Passwords do not match");
        return false
    }

    return true
}