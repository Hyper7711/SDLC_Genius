/**
 * ============================================================
 * SDLC Genius
 * ------------------------------------------------------------
 * Backend Server Entry Point
 * ============================================================
 */

import dotenv from "dotenv";

dotenv.config({
    path: ".env",
});

import app from "./app.js";
import registerShutdownHandlers from "./startup/shutdown.js";

const PORT = process.env.PORT || 5000;

/**
 * Start HTTP Server
 */
const server = app.listen(PORT, () => {
    console.clear();

    console.log("=================================================");
    console.log("🚀 SDLC Genius Backend Started");
    console.log("=================================================");
    console.log(`Environment : ${process.env.NODE_ENV}`);
    console.log(`Port        : ${PORT}`);
    console.log(`Node.js     : ${process.version}`);
    console.log("=================================================");
    console.log(`Server URL  : http://localhost:${PORT}`);
    console.log("Health API  : http://localhost:5000/api/v1/health");
    console.log("=================================================");
});

/**
 * Register graceful shutdown handlers.
 */
registerShutdownHandlers(server);