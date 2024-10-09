import express from "express";
import {
  fetchAllRecipes,
  fetchRecipe,
  fetchSimilar,
  getRecipeByUri,
  getRecipeByUserId,
  postRecipe,
  searchRecipe,
} from "../controller/recipe.controller.js";
import { protectRoute } from "../middleware/protectUser.js";

const router = express.Router();

router.get("/search/:query", searchRecipe);
router.get("/:uri", getRecipeByUri);
router.get("/fetch/:id", fetchRecipe);
router.get("/fetchAll", fetchAllRecipes);
router.get("/getRecipeByUserId/:id", getRecipeByUserId);
router.get("/similar", fetchSimilar);
router.post("/post", protectRoute, postRecipe);

export default router;
