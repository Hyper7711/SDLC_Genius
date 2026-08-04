/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Application Startup
 * ---------------------------------------------------------------
 * Centralized application bootstrap.
 *
 * Responsibilities:
 *  - Register global middleware
 *  - Register application routes
 *  - Register 404 middleware
 *  - Register global error handler
 *
 * NOTE:
 * This file is responsible ONLY for configuring the
 * Express application. It does NOT start the HTTP server.
 * ===============================================================
 */

import registerMiddleware from "./middleware.js";
import registerRoutes from "./routes.js";

import notFoundMiddleware from "../middleware/notFound.middleware.js";
import errorMiddleware from "../middleware/error.middleware.js";

/**
 * Initialize the Express application.
 *
 * @param {import("express").Express} app
 */
const initializeApplication = (app) => {
    /**
     * ===========================================================
     * Global Middleware
     * ===========================================================
     */

    registerMiddleware(app);

    /**
     * ===========================================================
     * Application Routes
     * ===========================================================
     */

    registerRoutes(app);

    /**
     * ===========================================================
     * 404 Middleware
     * ===========================================================
     *
     * Handles requests for routes that do not exist.
     */

    app.use(notFoundMiddleware);

    /**
     * ===========================================================
     * Global Error Middleware
     * ===========================================================
     *
     * MUST always be the last middleware.
     */

    app.use(errorMiddleware);
};

export default initializeApplication;