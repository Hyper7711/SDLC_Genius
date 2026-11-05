
"use strict";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Route Registry
 * ---------------------------------------------------------------
 * Centralizes all route modules.
 * ===============================================================
 */

import { Router } from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

/**
 * --------------------------------------------------------------
 * Health Routes
 * --------------------------------------------------------------
 */

router.use("/health", healthRoutes);

/**
 * --------------------------------------------------------------
 * Authentication Routes
 * --------------------------------------------------------------
 */

router.use("/auth", authRoutes);

/**
 * --------------------------------------------------------------
 * User Management Routes
 * --------------------------------------------------------------
 */

router.use("/users", userRoutes);

/**
 * --------------------------------------------------------------
 * Future Routes
 * --------------------------------------------------------------
 *
 * router.use("/projects", projectRoutes);
 * router.use("/ai", aiRoutes);
 * router.use("/docs", docsRoutes);
 *
 */

export default router;
