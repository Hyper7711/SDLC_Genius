/**
 * ============================================================
 * SDLC Genius
 * ------------------------------------------------------------
 * Express Application
 * ------------------------------------------------------------
 * Creates and configures the Express application.
 * ============================================================
 */

import express from "express";
import initializeApplication from "./startup/index.js";

const app = express();

/**
 * Initialize the application.
 */
initializeApplication(app);

export default app;