  import React ,{useState, useEffect} from "react";
  import { Link } from "react-router-dom";
  import { FaKey } from "react-icons/fa";
  import { IoPersonSharp } from "react-icons/io5";
  import useLogin from "../hooks/useLogin";
  // import { auth, provider } from "../firebase/firebaseConfig";
  // import {signInWithPopup} from "firebase/auth";





  const Login = () => {
  const {loading ,login} = useLogin();
  const [userName ,setUserName] = useState("");
  const [password ,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({userName , password});
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

    return (
      <div className="flex flex-col items-center justify-center min-w-full mx-auto max-md:p-4 ">
        <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25 border bg-white">
          <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-center text-black">
            <span>Login{" "}</span>
          
            {/* <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold"> ChatApp</span> */}
          </h1>
          <span className="text-center text-black pt-2 "> Don't have an account?
          <Link
              to="/signup"
              className="text-blue-600 hover:underline"
            >
            {" "}Register
            </Link></span> 
          </div>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
              <IoPersonSharp  className=" h-5 w-5"/>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="bg-white w-full h-10 px-3 py-2 border rounded-md"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
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
            

            <div>
              <button className="bg btn btn-block mt-2" disabled={loading}>
                {loading ? <span className='loading loading-spinner'></span> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Login;
