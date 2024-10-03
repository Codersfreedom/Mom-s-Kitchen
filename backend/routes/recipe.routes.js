import express from 'express'
import { fetchAllRecipes, fetchRecipe, postRecipe, searchRecipe } from '../controller/recipe.controller.js';
import { protectRoute } from '../middleware/protectUser.js';

const router = express.Router();

router.get("/search/:query",searchRecipe);
router.get("/fetch/:id",fetchRecipe);
router.get("/fetchAll",fetchAllRecipes);
router.post("/post",protectRoute,postRecipe);

export default router;