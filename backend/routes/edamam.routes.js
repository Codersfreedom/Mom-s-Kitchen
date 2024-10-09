import express from 'express'
import { getRecipeByUri, searchRecipe } from '../controller/edamam.controller.js';


const router = express.Router();

router.get("/search/:query",searchRecipe);
router.get("/recipe/:uri",getRecipeByUri);

export default router;