import express from 'express';
import { login, logout, signup, onboard } from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js';       

// Ensure that 'protectRoute' is a valid middleware function and 'onboard' is a valid controller function


const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
// The onboarding route is protected and handled by the onboard controller
router.post("/onboarding", protectRoute, onboard);
router.post("/logout", logout);


export default router;