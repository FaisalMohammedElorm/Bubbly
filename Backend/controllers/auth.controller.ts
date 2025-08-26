import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../modals/User.js";
import { generateToken } from "../utils/token.js";
// import { loginUser } from './auth.controller';


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, avatar } = req.body;
  
  // Input validation
  if (!email || !password) {
    res.status(400).json({ success: false, msg: "Email and password are required" });
    return;
  }

  try {
    // Check if already exists
    let user = await User.findOne({ email });
    if (user) {
       res.status(400).json({ success: false, msg: "User already exists" });
       return;
    }
    // Create New User
    user = new User({ 
      email, 
      password, 
      name, 
      avatar: avatar || "",
    });
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Save User
    await user.save();
    // Gen token
    const token = generateToken(user);
    res.json({
      success: true,
      token
    })
    
  } catch(error) {
    console.log("Error:", error);
    res.status(500).json({success: false, msg: "Server error"})
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  // Input validation
  if (!email || !password) {
    res.status(400).json({ success: false, msg: "Email and password are required" });
    return;
  }

  try {
    // Find user by email
    const user = await User.findOne({email});
    if(!user){
      res.status(400).json({success: false, msg: "Invalid credentials"});
      return;
    }
    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(400).json({success: false, msg: "Invalid credentials"});
      return;
    }
    // Gen token
    const token = generateToken(user);
    res.json({
      success: true,
      token
    })
    
  } catch(error) {
    console.log("Error:", error);
    res.status(500).json({success: false, msg: "Server error"})
  }
}

