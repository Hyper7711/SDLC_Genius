
"use strict";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Authentication Routes
 * ---------------------------------------------------------------
 * Handles user authentication endpoints.
 * ===============================================================
 */

import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = Router();

/**
 * POST /auth/register
 *
 * Register a new user account.
 */
router.post("/register", registerUser);

export default router;
