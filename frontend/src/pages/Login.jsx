import React ,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import useLogin from "../hooks/useLogin";
import { useConversation } from "../zustand/useConversation";
// import { auth, provider } from "../firebase/firebaseConfig";
// import {signInWithPopup} from "firebase/auth";

const Login = () => {
const {loading ,login} = useLogin();
const [email ,setEmail] = useState("");
const [password ,setPassword] = useState("");
const {profilePic,setProfilePic } = useConversation();

const handleSubmit = async (e) => {
  e.preventDefault();
  await login({email , password});
}
// const [value,setValue] = useState('')
//   const handleGoogleLogin =()=>{
//       signInWithPopup(auth,provider).then((data)=>{
//           setValue(data.user.email)
//           localStorage.setItem("email",data.user.email)
//           console.log(data)
//       })
//   }

//   useEffect(()=>{
//       setValue(localStorage.getItem('email'))
//   }) 

<<<<<<< HEAD
  return (
    <div className="flex flex-col items-center justify-center min-w-full mx-auto max-md:p-4 ">
      <button className="absolute top-0 left-0 mt-4 ml-4  p-2 max-md:hidden">
        <Link to="/">
        <div className=" font-bold text-[12px] ">
          <img
          src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716113819/Logo/rn4ihnpiptrahzc4pwg9.svg"
          alt="not found"
          className="w-14"
        />
        <span className=" text-xl text-[#0086cd] dark:text-gray-300 font-bold">
          ChatApp
        </span>
=======
    return (
      <div className="flex flex-col items-center justify-center min-w-full mx-auto max-md:p-4 ">
        <button className="absolute top-0 left-0 mt-4 ml-4  p-2 max-md:hidden">
          <Link to="/">
          <div className=" font-bold text-[12px] ">
            <img
            src="https://res.cloudinary.com/da1mwmvno/image/upload/v1716113819/Logo/rn4ihnpiptrahzc4pwg9.svg"
            alt="not found"
            className="w-14"
          />
          <span className=" text-xl text-[#0086cd] dark:text-gray-300 font-bold">
            ChatApp
          </span>
          </div>
          </Link>
        </button>
        <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25  border bg-white">
          <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-center text-black">
            <span>Login{" "}</span>
          
            {/* <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold"> ChatApp</span> */}
          </h1>
          <span className="text-center text-black pt-2 "> Don't have an account?
          <Link
              to="/signup"
              className="text-blue-600 hover:underline"
              onClick={() => setProfilePic("")}
            >
            {" "}Register
            </Link></span> 
          </div>
          <div className="flex justify-center items-center mt-4">
            <img className="w-[20%] h-[20%] rounded-full  object-cover " src={profilePic? profilePic : `https://res.cloudinary.com/da1mwmvno/image/upload/v1716117699/assets/tquplnnni1taoknudjny.png`} alt="" />
          </div>
          <form className="mt-6 text-slate-700" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
              <IoPersonSharp  className=" h-5 w-5"/>

                <input
                  type="text"
                  placeholder="Enter Email"
                  className="bg-white w-full h-10 px-3 py-2 border rounded-md"
                  onChange={(e) => {setEmail(e.target.value),setProfilePic("")}}
                  onBlur={handleSubmit}
                  value={email}
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-3">
              <FaKey />
                <input
                  type="password"
                  placeholder="********"
                  className="bg-white w-full h-10 px-3 py-2 border rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
            </div>

            {/* <div>
              <button className="bg btn btn-block mt-2" onClick={handleGoogleLogin}>
               google button
              </button>
              {value && <h1>{value}</h1>}
            </div> */}
            

            <div className="flex justify-center items-center">
              <button className=" btn btn-block text-slate-200 bg-slate-700 mt-2 w-[30%]" disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "Login"}
              </button>
            </div>
          </form>
>>>>>>> 53353f60a1caac54a55f79ca5facd53ba062a944
        </div>
        </Link>
      </button>
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25  border bg-white">
        <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center text-black">
          <span>Login{" "}</span>
        
          {/* <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold"> ChatApp</span> */}
        </h1>
        <span className="text-center text-black pt-2 "> Don't have an account?
        <Link
            to="/signup"
            className="text-blue-600 hover:underline"
            onClick={() => setProfilePic("")}
          >
          {" "}Register
          </Link></span> 
        </div>
        <div className="flex justify-center items-center mt-4">
          <img className="w-[20%] h-[20%] rounded-full  object-cover " src={profilePic? profilePic : `https://res.cloudinary.com/da1mwmvno/image/upload/v1716117699/assets/tquplnnni1taoknudjny.png`} alt="" />
        </div>
        <form className="mt-6 text-slate-700" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="flex items-center space-x-2">
            <IoPersonSharp  className=" h-5 w-5"/>

              <input
                type="text"
                placeholder="Enter Email"
                className="bg-white w-full h-10 px-3 py-2 border rounded-md"
                onChange={(e) => {setEmail(e.target.value),setProfilePic("")}}
                onBlur={handleSubmit}
                value={email}
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-3">
            <FaKey />
              <input
                type="password"
                placeholder="********"
                className="bg-white w-full h-10 px-3 py-2 border rounded-md"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
          </div>

          {/* <div>
            <button className="bg btn btn-block mt-2" onClick={handleGoogleLogin}>
             google button
            </button>
            {value && <h1>{value}</h1>}
          </div> */}
          

          <div className="flex justify-center items-center">
            <button className=" btn btn-block text-slate-200 bg-slate-700 mt-2 w-[30%]" disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;