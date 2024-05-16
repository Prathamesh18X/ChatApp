import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import getDataUri from "../utils/dataURI.js";

/*
  routes : api/auth/signup (signup)
  routes : api/auth/login (login)
  routes : api/auth/update (update)
  routes : api/auth/logout (logout)
  routes : api/auth/deleteAccount (deleteAccount)
*/

//signup
export const signup = async (req, res) => {
  try {
    const { input, step } = req.body;
    const data = JSON.parse(input);
    const { fullName, email, userName, password, confirmPassword, gender } =
      data.input;
    const profilePicFile = req.file;

    switch (step) {
      case "1":
        // Step 1: Validate email
        const existingUserWithEmail = await User.findOne({ email });
        if (existingUserWithEmail) {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(200).json({ success: "Email is valid" });

      case "2":
        // Step 2: Validate username and upload image
        const existingUserWithUsername = await User.findOne({ userName });
        if (existingUserWithUsername) {
          return res.status(400).json({ error: "Username already exists" });
        }
        return res.status(200).json({ success: "Username is valid" });

      case "3":
        // Step 3: Validate password and confirm password
        if (password !== confirmPassword) {
          return res.status(400).json({ error: "Passwords don't match" });
        }
        return res.status(200).json({ success: "Passwords match" });
      case "4":
        // Step 4: Final step, create new user
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload profile picture
        if (profilePicFile) {
          const profilePicUri = getDataUri(profilePicFile);
          const result = await uploadToCloudinary(profilePicUri.content);
          var profilePicUrl = result.url;
        }

        const [firstname, lastname] = fullName.includes(" ")
          ? fullName.split(" ")
          : [fullName, ""];


        const dummyProfilePic = `https://avatar.iran.liara.run/username?username=${firstname}${
          lastname ? "+" + lastname : ""
        }`;


        // Create new user
        const newUser = new User({
          email,
          fullName,
          userName,
          password: hashedPassword,
          gender,
          profilePic: profilePicFile ? profilePicUrl : dummyProfilePic,
        });

        // Save the new user
        await newUser.save();
        console.log("newUser", newUser);

        // Generate token and set it in cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Return successful response
        return res.status(201).json({
          _id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          userName: newUser.userName,
          profilePic: newUser.profilePic,
          success: "Signup successful",
        });

      default:
        // Invalid step number
        return res.status(400).json({ error: "Invalid step number" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    console.log("login successfull");
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
      success: "Login successfull",
    });
  } catch (error) {
    console.log("error in login controller : ", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const updateUserData = async (req, res) => {
  try {
      const loggedInUserId = req.user._id;
      const { userName, fullName} = req.body;
      const profilePicFile = req.file;
      const update = {};
      
      if (userName) {
          const existingUserName = await User.findOne({ userName });
          if (existingUserName && existingUserName._id.toString() !== loggedInUserId.toString()) {
              return res.status(400).json({ error: "User name already exists" });
          }
          update.userName = userName;
      }
      
      if (fullName) {
        update.fullName = fullName;
      }
      
      
      // if (email) {
      //     const existingEmail = await User.findOne({ email });
      //     if (existingEmail && existingEmail._id.toString() !== loggedInUserId.toString()) {
      //         return res.status(400).json({ error: "Email already exists" });
      //     }
      //     update.email = email;
      // }

      // Upload profile picture
      if (profilePicFile) {
        const profilePicUri = getDataUri(profilePicFile);
        const result = await uploadToCloudinary(profilePicUri.content);
        update.profilePic = result.url;
      }
      
      const updatedUser = await User.findByIdAndUpdate(loggedInUserId, update, { new: true });
      return res.status(200).json(updatedUser);
      
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("error in logout controller : ", error.message);
    res.status(500).json({ error: "Internal sever Error" });
  }
};



export const deleteSelfAccount = async (req, res) => {//working
try {
  const userId = req.params;
  const loggedInUserId = req.user._id;
  const data = req.body;


  if (loggedInUserId.toString() === userId.id && data.input === "Delete My Account") {
    await User.findByIdAndDelete(loggedInUserId);
    res.cookie("jwt", "", { maxAge: 0 });
  }
  res.status(200).json({ success: "User deleted successfully" });
}
catch (error) {
  console.error("error in deleteUser: ", error.message);
  res.status(500).json({ error: "Internal server error" });
}
}