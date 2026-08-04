/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Health Routes
 * ---------------------------------------------------------------
 * Provides health and status endpoints for the API.
 * ===============================================================
 */

import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import { env } from "../config/index.js";

const router = Router();

/**
 * GET /health
 *
 * Health check endpoint.
 */
router.get("/", (req, res) => {
    return ApiResponse.success(
        res,
        "SDLC Genius API is running successfully.",
        {
            application: env.APP_NAME,
            version: env.APP_VERSION,
            environment: env.NODE_ENV,
            uptime: `${Math.floor(process.uptime())} seconds`,
            timestamp: new Date().toISOString(),
        }
    );
});

export default router;