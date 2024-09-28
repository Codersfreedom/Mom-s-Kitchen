import { User } from "../model/user.model.js";

export const getFavorites = async (req, res) => {
  try {
    const user = req.user;
    const response = await User.findById(user._id);

    res.status(200).json(response.favorites);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
