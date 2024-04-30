import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
    const { loading, signUp } = useSignup();
    const [step, setStep] = useState(1);
    const [input, setInput] = useState({
        email: "",
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    // Function to handle changes to the gender checkbox
    const handleCheckboxChange = (gender) => {
        setInput({ ...input, gender });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 4) {
            await signUp(input);
        }
    };

    // Function to navigate to the next step
    const handleNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    // Function to navigate to the previous step
    const handlePreviousStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-full mx-auto max-md:p-4">
            <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25 border-2 bg-white border-c">
                <div className="flex flex-col text-center text-black">
                    <h1 className="flex flex-col text-3xl font-bold text-center text-black">
                        <span>Sign Up</span>
                    </h1>
                    <span className="pb-5">
                        Already have an account?{" "}
                        <Link className="hover:underline text-blue-600 inline-block" to="/Login">
                            {" "}
                            Login
                        </Link>
                    </span>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Email */}
                    {step === 1 && (
                        <div className="py-1">
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-gray-300 w-full input input-bordered h-10"
                                value={input.email}
                                onChange={(e) => setInput({ ...input, email: e.target.value })}
                            />
                            <span className="text-gray-900">We'll never share your email with anyone else.</span>
                        </div>
                    )}

                    {/* Step 2: Username and Full Name */}
                    {step === 2 && (
                        <>
                            <div className="py-1">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="bg-gray-300 w-full input input-bordered h-10"
                                    value={input.userName}
                                    onChange={(e) =>
                                        setInput({ ...input, userName: e.target.value })}
                                />
                            </div>
                            <div className="py-1">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="bg-gray-300 w-full input input-bordered h-10"
                                    value={input.fullName}
                                    onChange={(e) =>
                                        setInput({ ...input, fullName: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {/* Step 3: Password and Confirm Password */}
                    {step === 3 && (
                        <>
                            <div className="py-1">
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="bg-gray-300 w-full input input-bordered h-10"
                                    value={input.password}
                                    onChange={(e) =>
                                        setInput({ ...input, password: e.target.value })}
                                />
                            </div>

                            <div className="py-1">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="bg-gray-300 w-full input input-bordered h-10"
                                    value={input.confirmPassword}
                                    onChange={(e) =>
                                        setInput({ ...input, confirmPassword: e.target.value })}
                                />
                            </div>
                        </>
                    )}

                    {/* Step 4: Gender */}
                    {step === 4 && (
                        <GenderCheckbox
                            onCheckboxChange={handleCheckboxChange}
                            selectedGender={input.gender}
                        />
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4">
                        {/* Back Button */}
                        {step > 1 && (
                            <button
                                type="button"
                                className="btn border border-slate-700"
                                onClick={handlePreviousStep}
                                disabled={loading}
                            >
                                Back
                            </button>
                        )}

                        {/* Next or Submit Button */}
                        {step < 4 ? (
                            <button
                                type="button"
                                className="btn border border-slate-700"
                                onClick={handleNextStep}
                                disabled={loading}
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn border border-slate-700"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import GenderCheckbox from "../components/GenderCheckbox";
// import useSignup from "../hooks/useSignup";

// const SignUp = () => {
//   const {loading ,signUp} = useSignup();
//   const [input, setInput] = useState({
//     fullName: "",
//     userName: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//   });
//   const handleCheckboxChange = (gender) => {
//     setInput({ ...input, gender });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(input);
//     await signUp(input);
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-w-full mx-auto max-md:p-4 ">
//       <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25 border-2 bg-white border-c">
//         <div className="flex flex-col text-center text-black">
//         <h1 className="flex flex-col text-3xl font-bold text-center text-black">
//           {/* <span className="bg-gradient-to-r from-purple via-red to-yellow inline-block text-transparent bg-clip-text font-extrabold">
//             {" "}
//             ChatApp
//           </span> */}
//           <span>Sign Up </span>
//           </h1>
//           <span className="pb-5"> Already have an account? {""}
//             <Link
//             className=" hover:underline text-blue-600  inline-block"
//             to="/Login"
//           >
//              {" "}Login
//           </Link></span>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="py-1">
//             <input
//               type="text"
//               placeholder="FullName"
//               className="bg-gray-300 w-full input input-bordered h-10"
//               value={input.fullName}
//               onChange={(e) => setInput({ ...input, fullName: e.target.value })}
//             />
//           </div>

//           <div className="py-1">
//             <input
//               type="text"
//               placeholder="Username/Email"
//               className="bg-gray-300 w-full input input-bordered h-10"
//               value={input.userName}
//               onChange={(e) => setInput({ ...input, userName: e.target.value })}
//             />
//           </div>

//           <div className="py-1">
//             <input
//               type="password"
//               placeholder="Enter Password"
//               className="bg-gray-300 w-full input input-bordered h-10"
//               value={input.password}
//               onChange={(e) => setInput({ ...input, password: e.target.value })}
//             />
//           </div>

//           <div className="py-1">
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="bg-gray-300 w-full input input-bordered h-10"
//               value={input.confirmPassword}
//               onChange={(e) =>
//                 setInput({ ...input, confirmPassword: e.target.value })
//               }
//             />
//           </div>

//           <GenderCheckbox
//             onCheckboxChange={handleCheckboxChange}
//             selectedGender={input.gender}
//           />

//           <div>
//             <button className="btn btn-block mt-2 border border-slate-700" disabled={loading}>
//               {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default SignUp;
