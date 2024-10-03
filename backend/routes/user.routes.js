import express from 'express'
import { addToFavorite, getFavorites, handleFollow } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/protectUser.js';

const router = express.Router();

router.post("/addToFavorite/:id",protectRoute,addToFavorite)
router.get("/favorites",protectRoute,getFavorites);
router.get("/follow/:id",protectRoute,handleFollow);
export default router;