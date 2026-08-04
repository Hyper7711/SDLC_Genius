/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Backend Server Entry Point
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Load application configuration
 *  - Connect to MongoDB
 *  - Start the Express server
 *  - Register graceful shutdown handlers
 *
 * NOTE:
 * This is the ONLY file responsible for starting
 * the HTTP server.
 * ===============================================================
 */

import app from "./app.js";

import {
    env,
    connectDatabase,
    logger,
} from "./config/index.js";

import registerShutdownHandlers from "./startup/shutdown.js";

/**
 * Bootstrap the application.
 */
const bootstrap = async () => {
    try {
        /**
         * ----------------------------------------------------------
         * Connect Database First
         * ----------------------------------------------------------
         */

        await connectDatabase();

        /**
         * ----------------------------------------------------------
         * Start Express Server
         * ----------------------------------------------------------
         */

        const server = app.listen(env.PORT, () => {
            logger.info("=================================================");
            logger.info(`🚀 ${env.APP_NAME} Backend Started`);
            logger.info("=================================================");
            logger.info(`Environment : ${env.NODE_ENV}`);
            logger.info(`Version     : ${env.APP_VERSION}`);
            logger.info(`Port        : ${env.PORT}`);
            logger.info(`Node.js     : ${process.version}`);
            logger.info("=================================================");
            logger.info(
                `Server URL  : http://localhost:${env.PORT}`
            );
            logger.info(
                `Health API  : http://localhost:${env.PORT}/api/v1/health`
            );
            logger.info("=================================================");
        });

        /**
         * ----------------------------------------------------------
         * Register Shutdown Handlers
         * ----------------------------------------------------------
         */

        registerShutdownHandlers(server);

    } catch (error) {
        logger.error("=================================================");
        logger.error("Application startup failed.");
        logger.error(error);
        logger.error("=================================================");

        process.exit(1);
    }
};

/**
 * Start Application
 */
bootstrap();