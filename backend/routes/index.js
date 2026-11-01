
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
 * Future Routes
 * --------------------------------------------------------------
 *
 * router.use("/users", userRoutes);
 * router.use("/projects", projectRoutes);
 * router.use("/ai", aiRoutes);
 * router.use("/docs", docsRoutes);
 *
 */

export default router;