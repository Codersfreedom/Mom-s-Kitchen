import Recipe from "../model/recipe.model.js";
import cloudinary from "../services/cloudinary.js";



export const postRecipe = async (req, res) => {
  const user = req.user;
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
      user: user._id,
      name: user.name,
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
    const recipes = await Recipe.find({ visability: "public" });
    res.status(200).json({ status: true, recipes });
  } catch (error) {
    console.log("error in fetching recipe", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getRecipeByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const recipes = await Recipe.find({ user: id, visability: "public" });
    if (recipes.length > 0) {
      return res.status(200).json({ status: true, recipes });
    } else {
      return res.status(404).json({
        status: true,
        message: "User has no public recipes!",
        recipes: null,
      });
    }
  } catch (error) {
    console.log("Error in recipe controller ", error.message);
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

export const fetchSimilar = async (req, res) => {
  try {
    const similar = await Recipe.aggregate([
      { $sample: { size: 5 } },
      {
        $project: {
          _id: 1,
          name: 1,
          title: 1,
          description: 1,
          image: 1,
        },
      },
    ]);
    res.status(200).json({ status: true, similar });
  } catch (error) {
    console.log("Error in similar controller", error.message);
    res.status(500).json({ statu: false, message: "Internal server error" });
  }
};
