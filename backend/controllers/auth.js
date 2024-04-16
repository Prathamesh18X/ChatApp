import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";import { request } from "express";


//signup
export const signup = async(req,res) =>{
    try {
		const { fullName, userName, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ userName });

		if (user) {
			return res.status(400).json({ error: "username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			userName,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
            console.log("new user generated successfull");
			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				userName: newUser.userName,
				profilePic: newUser.profilePic,
				success : "signup successfull"
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

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