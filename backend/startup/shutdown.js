/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Graceful Shutdown Manager
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Gracefully shut down the HTTP server
 *  - Handle SIGINT (Ctrl + C)
 *  - Handle SIGTERM
 *  - Handle uncaught exceptions
 *  - Handle unhandled promise rejections
 *  - Prepare future resource cleanup
 * ===============================================================
 */

import { logger } from "../config/index.js";
import { mongoose } from "../config/database.js";

/**
 * Register graceful shutdown handlers.
 *
 * @param {import("http").Server} server
 */
const registerShutdownHandlers = (server) => {
    /**
     * Gracefully shuts down the application.
     *
     * @param {string} signal
     */
    const gracefulShutdown = async (signal) => {
        logger.warn("=================================================");
        logger.warn(`${signal} received.`);
        logger.warn("Gracefully shutting down SDLC Genius...");
        logger.warn("=================================================");

        try {
            /**
             * ------------------------------------------------------
             * Close HTTP Server
             * ------------------------------------------------------
             */
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve();
                });
            });

            logger.info("✓ HTTP Server closed.");

            /**
             * ------------------------------------------------------
             * Close MongoDB Connection
             * ------------------------------------------------------
             */

            if (mongoose.connection.readyState !== 0) {
                await mongoose.connection.close();

                logger.info("✓ MongoDB connection closed.");
            }

            /**
             * ------------------------------------------------------
             * Future Cleanup
             * ------------------------------------------------------
             *
             * Redis
             * AI Engine
             * Background Jobs
             * Scheduler
             * WebSockets
             *
             */

            logger.info("✓ Shutdown completed successfully.");
            logger.info("=================================================");

            process.exit(0);
        } catch (error) {
            logger.error("Shutdown failed.");
            logger.error(error);

            process.exit(1);
        }
    };

    /**
     * --------------------------------------------------------------
     * Operating System Signals
     * --------------------------------------------------------------
     */

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    /**
     * --------------------------------------------------------------
     * Uncaught Exceptions
     * --------------------------------------------------------------
     */

    process.on("uncaughtException", (error) => {
        logger.error("=================================================");
        logger.error("Uncaught Exception");
        logger.error(error);
        logger.error("=================================================");

        process.exit(1);
    });

    /**
     * --------------------------------------------------------------
     * Unhandled Promise Rejections
     * --------------------------------------------------------------
     */

    process.on("unhandledRejection", async (reason) => {
        logger.error("=================================================");
        logger.error("Unhandled Promise Rejection");
        logger.error(reason);
        logger.error("=================================================");

        await gracefulShutdown("UNHANDLED_REJECTION");
    });
};

export default registerShutdownHandlers;