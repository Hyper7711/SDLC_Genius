
"use strict";

import { Router } from "express";

import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * User Management Routes
 * ---------------------------------------------------------------
 * Handles user management operations.
 * ===============================================================
 */

// Get all users
router.get(
    "/",
    authenticateUser,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "User management route accessed successfully."
        });
    }
);

export default router;