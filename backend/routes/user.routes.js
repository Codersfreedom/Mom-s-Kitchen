import express from "express";
import {
  addToFavorite,
  askQuestions,
  deleteQuestion,
  deleteReply,
  getAllQuestions,
  getFavorites,
  getPostedRecipes,
  getProfile,
  handleFollow,
  postReply,
} from "../controller/user.controller.js";
import { protectRoute } from "../middleware/protectUser.js";

const router = express.Router();

router.get("/getProfile/:id",getProfile);
router.get("/addToFavorite/:id", protectRoute, addToFavorite);
router.get("/favorites", protectRoute, getFavorites);
router.get("/follow/:id", protectRoute, handleFollow);
router.get("/getPostedRecipes/:id", protectRoute, getPostedRecipes);
router.post("/askQuestions", protectRoute, askQuestions);
router.get("/questions/:id", getAllQuestions);
router.post("/postReply",protectRoute, postReply);
router.delete("/deleteQuestion/:id",protectRoute, deleteQuestion);
router.delete("/deleteReply/:questionId/:answerId",protectRoute, deleteReply);
export default router;
