/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Application Startup
 * ---------------------------------------------------------------
 * Centralized application bootstrap.
 *
 * Responsibilities:
 *  - Register middleware
 *  - Register routes
 *  - Register error handling
 *  - Initialize future services
 *
 * Keeping startup logic here prevents app.js from becoming
 * unnecessarily large as the application grows.
 * ===============================================================
 */

import registerMiddleware from "./middleware.js";
import registerRoutes from "./routes.js";

/**
 * Initializes the complete Express application.
 *
 * @param {import("express").Express} app
 */
const initializeApplication = (app) => {
    /**
     * ------------------------------------------------------------
     * Register Global Middleware
     * ------------------------------------------------------------
     */

    registerMiddleware(app);

    /**
     * ------------------------------------------------------------
     * Register Application Routes
     * ------------------------------------------------------------
     */

    registerRoutes(app);

    /**
     * ------------------------------------------------------------
     * Future Startup Modules
     * ------------------------------------------------------------
     *
     * initializeSockets(app);
     * initializeScheduler();
     * initializeAIEngine();
     * initializeMetrics(app);
     *
     */

    console.log("✓ Application startup completed.");
};

export default initializeApplication;