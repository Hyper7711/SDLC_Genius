/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Backend Server Entry Point
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Load validated application configuration
 *  - Establish MongoDB connection
 *  - Start the HTTP server
 *  - Register graceful shutdown handlers
 *  - Handle server startup errors
 *
 * NOTE:
 * This is the ONLY file responsible for starting
 * the HTTP server.
 * ===============================================================
 */

import app from "./app.js";

import {
    env,
    constants,
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
         * Step 1 : Connect Database
         * ----------------------------------------------------------
         */

        await connectDatabase();

        /**
         * ----------------------------------------------------------
         * Step 2 : Start HTTP Server
         * ----------------------------------------------------------
         */

        const server = app.listen(env.PORT, () => {
            logger.info("=================================================");
            logger.info(`🚀 ${env.APP_NAME} Started Successfully`);
            logger.info("=================================================");
            logger.info(`Version      : ${env.APP_VERSION}`);
            logger.info(`Environment  : ${env.NODE_ENV}`);
            logger.info(`Port         : ${env.PORT}`);
            logger.info(`Node.js      : ${process.version}`);
            logger.info(`API Base     : ${constants.API.BASE_PATH}`);
            logger.info(
                `Server URL   : http://localhost:${env.PORT}`
            );
            logger.info(
                `Health Check : http://localhost:${env.PORT}${constants.API.BASE_PATH}/health`
            );
            logger.info("=================================================");
        });

        /**
         * ----------------------------------------------------------
         * Step 3 : Handle Server Errors
         * ----------------------------------------------------------
         */

        server.on("error", (error) => {
            logger.error("HTTP Server Error");
            logger.error(error);

            process.exit(1);
        });

        /**
         * ----------------------------------------------------------
         * Step 4 : Register Graceful Shutdown
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
 * --------------------------------------------------------------
 * Start Application
 * --------------------------------------------------------------
 */

bootstrap();