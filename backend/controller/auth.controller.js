import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../model/user.model.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign({ userId: newUser._id }, secret, {
      expiresIn: "15d",
    });

    res.cookie("cook", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV != "development",
    });

    await newUser.save();
    res.status(201).json({
      status: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(
      { userId: user._id },

      secret,

      { expiresIn: "15d" }
    );

    res.cookie("cook", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV != "development",
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("cook");
    res.status(200).json({ success: true, message: "Logout sucess" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
