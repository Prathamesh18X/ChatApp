import React from "react";
import { FaKey } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";



const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-full mx-auto ">
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25 border bg-white">
        <h1 className="text-3xl font-bold text-center text-black">
          Login{" "}
          <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold"> ChatApp</span>
        </h1>

        <form className="mt-6">
          <div className="mb-4">
            <label className="flex items-center space-x-2">
            <IoPersonSharp  className=" h-5 w-5"/>

              <input
                type="text"
                placeholder="Enter username"
                className="bg-white w-full h-10 px-3 py-2 border rounded-md"
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
              />
            </label>
          </div>

          <a
            href="#"
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account?
          </a>

          <div>
            <button className="bg btn btn-block mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
