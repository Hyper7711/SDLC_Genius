/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Express Application
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Create the Express application
 *  - Initialize the application
 *  - Export the configured app
 *
 * NOTE:
 * This file DOES NOT:
 *  - Start the HTTP server
 *  - Connect to MongoDB
 *  - Load environment variables
 * Those responsibilities belong to server.js
 * ===============================================================
 */

import express from "express";
import initializeApplication from "./startup/index.js";

/**
 * Create Express application.
 */
const app = express();

/**
 * Initialize application.
 */
initializeApplication(app);

/**
 * Export configured application.
 */
export default app;