import express from 'express'
import { searchRecipe } from '../controller/recipe.controller.js';

const router = express.Router();

router.get("/search/:query",searchRecipe);

export default router;