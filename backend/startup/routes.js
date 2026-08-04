/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Route Registration
 * ---------------------------------------------------------------
 * Registers all application routes.
 *
 * Responsibilities:
 *  - Register root endpoint
 *  - Register API modules
 * ===============================================================
 */

import routes from "../routes/index.js";
import { constants } from "../config/index.js";

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
            documentation: constants.API.BASE_PATH,
        });
    });

    /**
     * ------------------------------------------------------------
     * Register API Routes
     * ------------------------------------------------------------
     */

    app.use(constants.API.BASE_PATH, routes);
};

export default registerRoutes;