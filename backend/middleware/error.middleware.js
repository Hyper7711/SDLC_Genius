/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Global Error Middleware
 * ---------------------------------------------------------------
 * Handles every unhandled error in the application.
 *
 * This middleware MUST be the LAST middleware registered.
 * ===============================================================
 */

import ApiResponse from "../utils/ApiResponse.js";

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
     * Prevent ESLint warning for unused parameter.
     */
    void next;

    /**
     * ------------------------------------------------------------
     * Default Error Values
     * ------------------------------------------------------------
     */
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let details = err.details || null;

    /**
     * ------------------------------------------------------------
     * Mongoose Validation Error
     * ------------------------------------------------------------
     */
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Validation failed.";
        details = err.errors;
    }

    /**
     * ------------------------------------------------------------
     * Invalid MongoDB ObjectId
     * ------------------------------------------------------------
     */
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource identifier.";
    }

    /**
     * ------------------------------------------------------------
     * Duplicate MongoDB Key
     * ------------------------------------------------------------
     */
    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate resource detected.";
        details = err.keyValue || null;
    }

    /**
     * ------------------------------------------------------------
     * Development Logging
     * ------------------------------------------------------------
     */
    if (process.env.NODE_ENV === "development") {
        console.error("\n========================================");
        console.error("❌ Global Error Middleware");
        console.error("========================================");
        console.error(err);
        console.error("========================================\n");
    }

    /**
     * ------------------------------------------------------------
     * Send Standardized Error Response
     * ------------------------------------------------------------
     */
    return ApiResponse.error(
        res,
        message,
        statusCode,
        process.env.NODE_ENV === "development"
            ? {
                  details,
                  stack: err.stack,
              }
            : details
    );
};

export default errorMiddleware;