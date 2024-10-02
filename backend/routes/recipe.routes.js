import express from 'express'
import { postRecipe, searchRecipe } from '../controller/recipe.controller.js';
import { protectRoute } from '../middleware/protectUser.js';

const router = express.Router();

router.get("/search/:query",searchRecipe);
router.post("/post",protectRoute,postRecipe);

export default router;