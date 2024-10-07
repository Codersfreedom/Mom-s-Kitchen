import express from "express";
import {
  addToFavorite,
  askQuestions,
  getAllQuestions,
  getFavorites,
  getPostedRecipes,
  handleFollow,
  postReply,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/protectUser.js";

const router = express.Router();

router.get("/addToFavorite/:id", protectRoute, addToFavorite);
router.get("/favorites", protectRoute, getFavorites);
router.get("/follow/:id", protectRoute, handleFollow);
router.get("/getPostedRecipes/:id", protectRoute, getPostedRecipes);
router.post("/askQuestions", protectRoute, askQuestions);
router.get("/questions/:id", getAllQuestions);
router.post("/postReply",protectRoute, postReply);
export default router;
