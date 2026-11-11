
"use strict";

import ApiResponse from "../utils/ApiResponse.js";

import {
    env,
    logger,
    constants,
} from "../config/index.js";

/**
 * Global Error Handler
 */
const errorMiddleware = (err, req, res, next) => {
    void next;

    let statusCode =
        err.statusCode ||
        constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;

    let message =
        err.message ||
        "Internal Server Error";

    let details =
        err.details || null;

    /**
     * Mongoose Validation Error
     */
    if (err.name === "ValidationError") {
        statusCode = constants.HTTP_STATUS.BAD_REQUEST;
        message = "Validation failed.";

        details = Object.values(err.errors).map((error) => ({
            field: error.path,
            message: error.message
        }));
    }

    /**
     * Invalid MongoDB ObjectId
     */
    if (err.name === "CastError") {
        statusCode = constants.HTTP_STATUS.BAD_REQUEST;
        message = "Invalid resource identifier.";
        details = null;
    }

    /**
     * Duplicate Key Error
     */
    if (err.code === 11000) {
        statusCode = constants.HTTP_STATUS.CONFLICT;
        message = "Duplicate resource detected.";
        details = null;
    }

    /**
     * Unexpected Server Errors
     */
    if (statusCode >= 500) {
        message = "Internal Server Error";
        details = null;
    }

    /**
     * Server-side Error Logging
     */
    logger.error("=================================================");
    logger.error(`${req.method} ${req.originalUrl}`);
    logger.error(message);
    logger.error(err.stack || err);

    logger.error("=================================================");

    /**
     * Client Error Response
     */
    const responseErrors =
        env.NODE_ENV === "development"
            ? {
                  details,
                  stack: err.stack || null
              }
            : null;

    return ApiResponse.error(
        res,
        message,
        statusCode,
        responseErrors
    );
};

export default errorMiddleware;