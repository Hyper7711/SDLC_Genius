/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Global Error Middleware
 * ---------------------------------------------------------------
 * Handles every unhandled error in the application.
 *
 * Responsibilities:
 *  - Handle AppError
 *  - Handle Mongoose errors
 *  - Handle unexpected errors
 *  - Log errors
 *  - Return standardized API responses
 *
 * NOTE:
 * This MUST be the last middleware registered.
 * ===============================================================
 */

import ApiResponse from "../utils/ApiResponse.js";

import {
    env,
    logger,
    constants,
} from "../config/index.js";

/**
 * Global Error Handler
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const errorMiddleware = (err, req, res, next) => {
    /**
     * Prevent ESLint warning.
     */
    void next;

    /**
     * ------------------------------------------------------------
     * Default Error
     * ------------------------------------------------------------
     */

    let statusCode =
        err.statusCode ||
        constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;

    let message =
        err.message ||
        "Internal Server Error";

    let details =
        err.details || null;

    /**
     * ------------------------------------------------------------
     * Mongoose Validation Error
     * ------------------------------------------------------------
     */

    if (err.name === "ValidationError") {
        statusCode = constants.HTTP_STATUS.BAD_REQUEST;
        message = "Validation failed.";
        details = err.errors;
    }

    /**
     * ------------------------------------------------------------
     * Invalid MongoDB ObjectId
     * ------------------------------------------------------------
     */

    if (err.name === "CastError") {
        statusCode = constants.HTTP_STATUS.BAD_REQUEST;
        message = "Invalid resource identifier.";
    }

    /**
     * ------------------------------------------------------------
     * Duplicate Key Error
     * ------------------------------------------------------------
     */

    if (err.code === 11000) {
        statusCode = constants.HTTP_STATUS.CONFLICT;
        message = "Duplicate resource detected.";
        details = err.keyValue;
    }

    /**
     * ------------------------------------------------------------
     * Development Logging
     * ------------------------------------------------------------
     */

    logger.error("=================================================");
    logger.error(`${req.method} ${req.originalUrl}`);
    logger.error(message);

    if (env.NODE_ENV === "development") {
        logger.error(err.stack);
    }

    logger.error("=================================================");

    /**
     * ------------------------------------------------------------
     * Standardized Error Response
     * ------------------------------------------------------------
     */

    return ApiResponse.error(
        res,
        message,
        statusCode,
        env.NODE_ENV === "development"
            ? {
                  details,
                  stack: err.stack,
              }
            : details
    );
};

export default errorMiddleware;