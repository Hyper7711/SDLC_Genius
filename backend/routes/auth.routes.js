
"use strict";

import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/auth.controller.js";

const router = Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Logout current user
router.post("/logout", logoutUser);

export default router;
