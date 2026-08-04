/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Route Registration
 * ---------------------------------------------------------------
 * Centralized registration of all application routes.
 *
 * Responsibilities:
 *  - Register root endpoint
 *  - Register API version prefixes
 *  - Register feature routes
 *  - Register future API versions
 * ===============================================================
 */

import express from "express";

/**
 * Register all application routes.
 *
 * @param {import("express").Express} app
 */
const registerRoutes = (app) => {
    /**
     * ------------------------------------------------------------
     * Root Endpoint
     * ------------------------------------------------------------
     */

    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            application: "SDLC Genius",
            message: "Welcome to the SDLC Genius Backend API",
            version: "1.0.0",
            documentation: "/api/v1",
        });
    });

    /**
     * ------------------------------------------------------------
     * API Version 1
     * ------------------------------------------------------------
     */

    const apiV1 = express.Router();

    /**
     * Health Check Endpoint
     *
     * Temporary endpoint.
     * This will later be moved to:
     *
     * routes/health.routes.js
     */

    apiV1.get("/health", (req, res) => {
        res.status(200).json({
            success: true,
            status: "OK",
            message: "SDLC Genius API is running successfully.",
            version: "1.0.0",
            environment: process.env.NODE_ENV || "development",
            timestamp: new Date().toISOString(),
        });
    });

    /**
     * ------------------------------------------------------------
     * Future Modules
     * ------------------------------------------------------------
     *
     * apiV1.use("/auth", authRoutes);
     * apiV1.use("/users", userRoutes);
     * apiV1.use("/projects", projectRoutes);
     * apiV1.use("/ai", aiRoutes);
     * apiV1.use("/documentation", documentationRoutes);
     * apiV1.use("/admin", adminRoutes);
     */

    app.use("/api/v1", apiV1);

    /**
     * ------------------------------------------------------------
     * API Not Found
     * ------------------------------------------------------------
     */

    app.use("/api/*", (req, res) => {
        res.status(404).json({
            success: false,
            message: "API endpoint not found.",
            path: req.originalUrl,
        });
    });
};

export default registerRoutes;