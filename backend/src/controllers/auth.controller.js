import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export async function signup(req, res)  {
   const {email, password, fullName} = req.body;

   try {
    if (!email || !password || !fullName){
        return res.status(400).json({message: "All fields are required" });
    }
    if(password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters" })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({message: "User already exists with this email" });
    }
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/192/${idx}.png`;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        email,
        password: hashedPassword,
        fullName,
        avatar: randomAvatar
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    res.cookie("auth_token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        httpOnly: true,
        sameSite: "strict"
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ success: true, user: userWithoutPassword });
   } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
   }
}





export async function login(req, res)  {
   try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Emaail and password are required" });
    }
    const user = await User.findOne({ email });
    if(!user) {
       return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await 
   } catch (error) {
    
   }
}

export async function logout(req, res)  {
    res.send("Logout Route")
}