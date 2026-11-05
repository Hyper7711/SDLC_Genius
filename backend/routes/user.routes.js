
"use strict";

import { Router } from "express";

import { getAllUsers } from "../controllers/user.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * User Management Routes
 * ---------------------------------------------------------------
 * Admin-only user management endpoints.
 * ===============================================================
 */

// Get all registered users
router.get(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    getAllUsers
);

export default router;
