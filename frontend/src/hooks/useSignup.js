import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";

const useSignup = () => {
  const { setAuthUser } = useAuth();
  const [loading, setLoading] = useState(false);

  // Function to handle requests at each step
  const requestDataForStep = async (input, step, profilePic) => {
    setLoading(true);

    // Validate the input at the current step
    if (!handleInputError(input, step)) {
      setLoading(false);
      return false;
    }

    const formData = new FormData();
    formData.append("input", JSON.stringify({ input, step }));
    formData.append("step", step);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    const requestPromise = fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      // Parse the JSON response
      const data = await response.json();

      // Check the HTTP status code for the response
      if (response.ok) {
        // If the final step (step 4) is successful, set the auth user and store data
        if (step === 4) {
          localStorage.setItem("authChatUser", JSON.stringify(data));
          setAuthUser(data);
        }
        return data;
      } else {
        // Handle server errors
        throw new Error(data.error);
      }
    });

    if (step === 4) {
      try {
        await toast.promise(
          requestPromise,
          {
            loading: 'Signing up...',
            success: `Signup successful, welcome ${input.userName}!`,
            error: 'Signup failed. Please try again.',
          }
        );
        return true; // Return true for successful validation or submission
      } catch (error) {
        return false; // Return false to indicate an error
      } finally {
        setLoading(false); // Set loading state to false once the request is complete
      }
    } else {
      try {
        await requestPromise;
        return true; // Return true for successful validation or submission
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        return false; // Return false to indicate an error
      } finally {
        setLoading(false); // Set loading state to false once the request is complete
      }
    }
  };

  // Function to validate input at each step
  const handleInputError = (input, step) => {
    const { email, fullName, userName, password, confirmPassword, gender } = input;
    if (step === 1) {
      // Step 1: Validate email
      if (!email) {
        toast.error("Please enter a valid email address.");
        return false;
      }
    } else if (step === 2) {
      // Step 2: Validate username and full name
      if (!userName) {
        toast.error("Please enter a valid username.");
        return false;
      }
    } else if (step === 3) {
      // Step 3: Validate password and confirm password
      if (!password) {
        toast.error("Please enter a password.");
        return false;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return false;
      }
      if (!confirmPassword) {
        toast.error("Please confirm your password.");
        return false;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return false;
      }
    } else if (step === 4) {
      // Step 4: Validate gender and full name
      if (!gender) {
        toast.error("Please select your gender.");
        return false;
      }
      if (!fullName) {
        toast.error("Please enter your full name.");
        return false;
      }
    }
    return true; // Return true if all input is valid
  };

  return { loading, requestDataForStep };
};

export default useSignup;
