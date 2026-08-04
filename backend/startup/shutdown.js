/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Graceful Shutdown Manager
 * ---------------------------------------------------------------
 * Handles:
 *  - Graceful server shutdown
 *  - SIGINT
 *  - SIGTERM
 *  - Uncaught Exceptions
 *  - Unhandled Promise Rejections
 *
 * Future Responsibilities:
 *  - Close MongoDB connection
 *  - Close Redis connection
 *  - Stop AI workers
 *  - Stop schedulers
 * ===============================================================
 */

/**
 * Register application shutdown handlers.
 *
 * @param {import("http").Server} server
 */
const registerShutdownHandlers = (server) => {
    /**
     * Gracefully closes the HTTP server.
     *
     * @param {string} signal
     */
    const gracefulShutdown = (signal) => {
        console.log("\n=================================================");
        console.log(`⚠ ${signal} received.`);
        console.log("Shutting down SDLC Genius...");
        console.log("=================================================");

        server.close(() => {
            console.log("✓ HTTP Server closed.");

            /**
             * Future cleanup
             *
             * await mongoose.disconnect();
             * await redis.disconnect();
             * await stopSchedulers();
             * await stopWorkers();
             */

            console.log("✓ Shutdown completed successfully.");
            console.log("=================================================\n");

            process.exit(0);
        });
    };

    /**
     * Handle CTRL + C
     */
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    /**
     * Handle process termination
     */
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    /**
     * Handle uncaught exceptions
     */
    process.on("uncaughtException", (error) => {
        console.error("\n==============================================");
        console.error("❌ Uncaught Exception");
        console.error("==============================================");
        console.error(error);

        process.exit(1);
    });

    /**
     * Handle unhandled promise rejections
     */
    process.on("unhandledRejection", (reason) => {
        console.error("\n==============================================");
        console.error("❌ Unhandled Promise Rejection");
        console.error("==============================================");
        console.error(reason);

        server.close(() => {
            process.exit(1);
        });
    });
};

export default registerShutdownHandlers;