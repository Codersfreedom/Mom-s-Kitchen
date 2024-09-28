import express from 'express'
import { getFavorites } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/protectUser.js';

const router = express.Router();

router.get("/favorites",protectRoute,getFavorites);

export default router;