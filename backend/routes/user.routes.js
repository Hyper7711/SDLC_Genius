
"use strict";

import { Router } from "express";

import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";

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

// Get a registered user by ID
router.get(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    getUserById
);

// Update a registered user
router.patch(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    updateUser
);

// Delete a registered user
router.delete(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    deleteUser
);

export default router;
