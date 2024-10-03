import Recipe from "../model/recipe.model.js";
import { fetchFromEdamam } from "../services/axios.js";
import cloudinary from "../services/cloudinary.js";

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

export const postRecipe = async (req, res) => {
  const {
    title,
    description,
    category,
    image,
    prepTime,
    cookTime,
    ingredients,
    directions,
    visability,
  } = req.body;
  try {
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "moms-kitchen",
      });
    }

    const newRecipe = new Recipe({
      title,
      description,
      category,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      prepTime,
      cookTime,
      ingredients,
      directions,
      visability,
    });

    await newRecipe.save();
    res.status(201).json({ status: true, recipe: newRecipe });
  } catch (error) {
    console.log("error in recipe controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const fetchAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ status: true, recipes });
  } catch (error) {
    console.log("error in fetching recipe", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const fetchRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.status(200).json({ status: true, recipe });
  } catch (error) {
    console.log("Error in recipe controller", error.message);
    res.status(500).json({ status: false, message: "Internal server erorr" });
  }
};
