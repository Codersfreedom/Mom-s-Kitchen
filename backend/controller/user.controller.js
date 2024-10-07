import Question from "../model/question.model.js";
import Recipe from "../model/recipe.model.js";
import { User } from "../model/user.model.js";

export const getFavorites = async (req, res) => {
  try {
    const recipes = await Recipe.find({ _id: { $in: req.user.favorites } });

    res.status(200).json(recipes);
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const addToFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const existingRecipe = await user.favorites.find((item) => item.id == id);

    if (existingRecipe) {
      user.favorites.pull(id);
    } else {
      user.favorites.push(id);
    }
    await user.save();
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const handleFollow = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = req.user;

    const isFollowing = await user.following.find((item) => item.id == id);
    console.log(isFollowing);
    const otherUser = await User.findById(id);

    if (isFollowing) {
      user.following.pull(id);
      otherUser.followers.pull(user._id);
    } else {
      user.following.push(id);
      otherUser.followers.push(user._id);
    }
    await user.save();
    await otherUser.save();
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getPostedRecipes = async (req, res) => {
  try {
    const user = req.user;
    const recipes = await Recipe.find({ user: { $in: user._id } });

    res.status(200).json({ status: true, recipes });
  } catch (error) {
    console.log("Error in user controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const askQuestions = async (req, res) => {
  try {
    const { recipeId, query } = req.body;
console.log(recipeId,query)
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ status: false, message: "Recipe not found" });
    }
    let newQuestion = null;
    const isExistingQuestions = await Question.find({ recipeId });
   
    if (isExistingQuestions.length>0) {
      newQuestion = await Question.findOneAndUpdate(
        { recipeId },
        {
          $push: {
            questions: {
              query,
              askedBy: {
                userId: req.user._id,
                name: req.user.name,
              },
            },
          },
        },
        {new:true}
      );
    } else {
      
      newQuestion = await Question.create({
        recipeId,
        questions: [
          {
            query,
            askedBy: {
              userId: req.user._id,
              name: req.user.name,
            },
          },
        ],
      });
    }

    
    res.status(200).json({ status: true, questions:newQuestion.questions });
  } catch (error) {
    console.log("Error in askQuestions controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const { id } = req.params;

    const questions = await Question.find({ recipeId: { $in: id } });

    res.status(200).json({ status: true, questions });
  } catch (error) {
    console.log("Error in get all questions controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
