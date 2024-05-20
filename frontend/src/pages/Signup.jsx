import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/QuickButtons/GenderCheckbox";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const { loading, requestDataForStep } = useSignup();
  const [step, setStep] = useState(1);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [input, setInput] = useState({
    email: "",
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
    if (step === 4) {
      await requestDataForStep(input, step, profilePic);
    }
  };

  const handleNextStep = async () => {
    const isStepValid = await requestDataForStep(input, step);
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    const imageUrl = URL.createObjectURL(file);
    setProfilePicUrl(imageUrl);
  };
  //enter key down

  return (
    <div className="flex flex-col items-center justify-center min-w-full mx-auto max-md:p-4">
      <button className="absolute top-0 left-0 mt-4 ml-4  p-2 max-md:hidden">
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
        </button>
        
      <ul className="absolute top-10 steps steps-horizontal   text-black text-[10px]">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Email</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Profile</li>
        <li className={`step ${step >= 3 ? "step-primary" : ""}`}>Password</li>
        <li className={`step ${step >= 4 ? "step-primary" : ""}`}>Personal</li>
      </ul>
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-25  border-2 bg-white border-c">
        <div className="flex flex-col text-center text-black">
          <h1 className="flex flex-col text-3xl font-bold text-center text-black">
            <span>Sign Up</span>
          </h1>
          <span className="pb-3">
            Already have an account?{" "}
            <Link
              className="hover:underline text-blue-600 inline-block"
              to="/Login"
            >
              Login
            </Link>
          </span>
        </div><hr className="mb-5 dark:border-white"></hr>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Email */}
          {step === 1 && (
            <>
              <label htmlFor="email" className="text-gray-900">
                Enter email
              </label>
              <div className="py-1">
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  className="bg-white w-full input input-bordered h-10"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                />
                <span className="text-gray-900">
                  We'll never share your email with anyone else.
                </span>
              </div>
            </>
          )}

          {/* Step 2: Username and Full Name */}
          {step === 2 && (
            <>
              <div className="pb-2 flex justify-center items-center">
                {/* Update the src attribute of the img element to profilePicUrl */}
                <div className="flex flex-col text-gray-900 text-sm font-semibold justify-center items-center">
                  <label htmlFor="profilePic" className="">
                    <img
                      className="w-32 h-32 rounded-full cursor-pointer object-cover"
                      src={
                        profilePicUrl ||
                        "https://res.cloudinary.com/da1mwmvno/image/upload/v1716117776/assets/payqr7odw4r8m9s9tl8j.png"
                      }
                      alt="select profile picture"
                    />
                  </label>
                  <span>Select Profile Picture</span>
                </div>
                <input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="py-6  flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Username"
                  className="bg-white text-center w-50  input input-bordered h-10"
                  value={input.userName}
                  onChange={(e) =>
                    setInput({ ...input, userName: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* Step 3: Password and Confirm Password */}
          {step === 3 && (
            <>
              <div className="text-gray-900">Generate Password</div>
              <div className="py-1">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="bg-white w-full input input-bordered h-10"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                />
              </div>

              <div className="py-1">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-white w-full input input-bordered h-10"
                  value={input.confirmPassword}
                  onChange={(e) =>
                    setInput({ ...input, confirmPassword: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* Step 4: Gender */}
          {step === 4 && (
            <>
            <div className="text-gray-900 mb-4 text-center">Select your gender</div>
              <GenderCheckbox
                onCheckboxChange={handleCheckboxChange}
                selectedGender={input.gender}
              />
              <div className="py-6">
                <label htmlFor="fullName" className="text-gray-900">
                  Enter your Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="bg-white w-full input input-bordered h-10"
                  value={input.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {/* Back Button */}
            {step > 1 && (
              <button
                type="button"
                className="btn  bg-slate-700"
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
                className="btn  bg-slate-700"
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
