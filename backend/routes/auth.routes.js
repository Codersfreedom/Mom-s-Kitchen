import express from 'express'
import { checkAuth, login, logout, signup } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/protectUser.js';
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/checkAuth",protectRoute,checkAuth);

export default router;