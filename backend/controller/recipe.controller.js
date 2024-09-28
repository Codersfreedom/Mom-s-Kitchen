import { fetchFromEdamam } from "../services/axios.js";

export const searchRecipe = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromEdamam(
      `https://api.edamam.com/api/recipes/v2/?app_id=7c55c750&app_key=823ea7c60e9db793290429c0782d07ad&q=${query}&type=public`
    );

    res.status(200).json(response);
  } catch (error) {
    console.log("Error in recipe controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
