
"use strict";

import { Router } from "express";

import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/project.controller.js";

import { authenticateUser } from "../middleware/auth.middleware.js";
import validate from "../middleware/validation.middleware.js";

import {
    createProjectSchema,
    updateProjectSchema
} from "../validators/project.validator.js";

const router = Router();

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Project Management Routes
 * ---------------------------------------------------------------
 * Authenticated users can manage their own projects.
 * ===============================================================
 */

// Create a new project
router.post(
    "/",
    authenticateUser,
    validate(createProjectSchema),
    createProject
);

// Get all projects belonging to the authenticated user
router.get(
    "/",
    authenticateUser,
    getAllProjects
);

// Get a project by ID
router.get(
    "/:id",
    authenticateUser,
    getProjectById
);

// Update a project
router.patch(
    "/:id",
    authenticateUser,
    validate(updateProjectSchema),
    updateProject
);

// Delete a project
router.delete(
    "/:id",
    authenticateUser,
    deleteProject
);

export default router;
