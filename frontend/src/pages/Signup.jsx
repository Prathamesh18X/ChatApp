import { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const {loading ,signUp} = useSignup();
  const [input, setInput] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleCheckboxChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);
    await signUp(input);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-full mx-auto ">
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25 border-2 bg-white border-c">
        <h1 className="flex flex-col text-3xl font-bold text-center text-black my-5">
          <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold">
            {" "}
            ChatApp
          </span>
          <span>Sign Up </span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="py-1">
            <input
              type="text"
              placeholder="FullName"
              className="bg-gray-300 w-full input input-bordered h-10"
              value={input.fullName}
              onChange={(e) => setInput({ ...input, fullName: e.target.value })}
            />
          </div>

          <div className="py-1">
            <input
              type="text"
              placeholder="Username/Email"
              className="bg-gray-300 w-full input input-bordered h-10"
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
            />
          </div>

          <div className="py-1">
            <input
              type="password"
              placeholder="Enter Password"
              className="bg-gray-300 w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <div className="py-1">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-gray-300 w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={input.gender}
          />

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/Login"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block mt-2 border border-slate-700" disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
