import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["cook"];

    if (!token) {
      return res.status(402).json("Unauthorized no token found");
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(401).json("Unauthorized token is not verified");
    }

    const user = await User.findById(verify.userId).select("-password");
  
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in middleware ", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
