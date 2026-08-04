/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Standard API Response Utility
 * ---------------------------------------------------------------
 * Provides a consistent response format for all APIs.
 *
 * Every controller should use this utility instead of calling
 * res.status(...).json(...) directly.
 * ===============================================================
 */

class ApiResponse {
    /**
     * Send a successful response.
     *
     * @param {import("express").Response} res
     * @param {string} message
     * @param {*} data
     * @param {number} statusCode
     */
    static success(
        res,
        message = "Request completed successfully.",
        data = null,
        statusCode = 200
    ) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    }

    /**
     * Send an error response.
     *
     * @param {import("express").Response} res
     * @param {string} message
     * @param {number} statusCode
     * @param {*} errors
     */
    static error(
        res,
        message = "Something went wrong.",
        statusCode = 500,
        errors = null
    ) {
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
            errors,
            timestamp: new Date().toISOString(),
        });
    }
}

export default ApiResponse;