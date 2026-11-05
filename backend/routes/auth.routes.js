
"use strict";

import { Router } from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from "../controllers/auth.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";

const router = Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

// Logout current user
router.post("/logout", logoutUser);

// Get current authenticated user
router.get("/me", authenticateUser, getCurrentUser);

export default router;
