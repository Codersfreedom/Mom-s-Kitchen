import {fetchFromEdamam} from '../services/axios.js'
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
export const searchRecipe = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await fetchFromEdamam(
      `https://api.edamam.com/api/recipes/v2/?app_id=${app_id}&app_key=${app_key}&q=${query}&type=public`
    );

    res.status(200).json({ status: true, recipes: response });
  } catch (error) {
    console.log("Error in recipe controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getRecipeByUri = async (req, res) => {
  const { uri } = req.params;
  const encodedUri = encodeURIComponent(uri);

  try {
    const requestUrl = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${app_id}&app_key=${app_key}`;

    const response = await fetchFromEdamam(requestUrl);

    res.status(200).json({ status: true, recipe: response });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
