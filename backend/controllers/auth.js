import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";


//signup
export const signup = async (req, res) => {
    const { input, step } = req.body;
    try {
        if (step === 1) {
            // Step 1: Validate email
            const { email } = input;
            const existingUserWithEmail = await User.findOne({ email });
            if (existingUserWithEmail) {
                return res.status(400).json({ error: "Email already exists" });
            }
            // Email is valid
            return res.status(200).json({ success: "Email is valid" });
        } else if (step === 2) {
            // Step 2: Validate username
            const { userName } = input;
            const existingUserWithUsername = await User.findOne({ userName });
            if (existingUserWithUsername) {
                return res.status(400).json({ error: "Username already exists" });
            }
            // Username is valid
            return res.status(200).json({ success: "Username is valid" });
        } else if (step === 3) {
            // Step 3: Validate password and confirm password
            const { password, confirmPassword } = input;
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Passwords don't match" });
            }
            // Password and confirm password are valid
            return res.status(200).json({ success: "Passwords match" });
        } else if (step === 4) {
            // Step 4: Final step, create new user
            const { email, fullName, userName, password, gender } = input;

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Generate profile picture URL based on gender
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

            // Create new user
            const newUser = new User({
                email,
                fullName,
                userName,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
            });

            // Save the new user
            await newUser.save();

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
        } else {
            // Invalid step number
            return res.status(400).json({ error: "Invalid step number" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async(req,res) =>{
   try {
    const {userName , password} = req.body;
    const user = await User.findOne({userName})
    const isPasswordCorrect = await bcrypt.compare(password , user?.password || "")

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error : "Invalid Credentials"});
    }

    generateTokenAndSetCookie(user._id, res);
    console.log("login successfull");
    res.status(200).json({
        _id: user._id,
		email: user.email,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic,
		success : "Login successfull"
    });
   } catch (error) {
        console.log("error in login controller : ", error.message);
        res.status(500).json({error : "Internal server Error"})
   }
    
}
export const logout = async(req,res) =>{
    try {
        res.cookie("jwt","",{maxAge : 0})
        res.status(200).json({message : "logout successfully"})
    } catch (error) {
        console.log("error in logout controller : ", error.message);
        res.status(500).json({error : "Internal sever Error"})
    }
}