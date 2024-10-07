import Question from "../model/question.model.js";
import Recipe from "../model/recipe.model.js";
import { User } from "../model/user.model.js";

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, user });
  } catch (error) {
    console.log("Error in getting profile controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

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
    console.log(recipeId, query);
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res
        .status(404)
        .json({ status: false, message: "Recipe not found" });
    }
    let newQuestion = null;
    const isExistingQuestions = await Question.find({ recipeId });

    if (isExistingQuestions.length > 0) {
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
        { new: true }
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

    res.status(200).json({ status: true, questions: newQuestion.questions });
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

export const postReply = async (req, res) => {
  try {
    const { id, reply } = req.body;
    if (!reply) {
      return res.status(400).json({
        status: false,
        message: "Reply field can't be empty",
      });
    }
    const question = await Question.findOneAndUpdate(
      { "questions._id": id },
      {
        $push: {
          "questions.$.answers": {
            answer: reply,

            answeredBy: {
              name: req.user.name,
              userId: req.user._id,
            },
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, question });
  } catch (error) {
    console.log("Error in post reply controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Question.findOneAndUpdate(
      {
        "questions._id": id,
      },
      {
        $pull: {
          questions: { _id: id },
        },
      },
      { new: true }
    );
    res.status(200).json({ status: true, questions });
  } catch (error) {
    console.log("Error in deleteQuesion controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { questionId,answerId } = req.params;
    
   const updatedAnswers = await Question.findOneAndUpdate(
      { "questions._id": questionId },
      {
        $pull: {
          "questions.$.answers": { _id: answerId },
        },
      }
    );
    if(updatedAnswers){

      res.status(200).json({ status: true, message: "Reply deleted" });
    }
  } catch (error) {
    console.log("Error in delete reply controller", error.message);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
