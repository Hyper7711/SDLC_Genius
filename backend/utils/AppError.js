/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Custom Application Error
 * ---------------------------------------------------------------
 * Represents operational errors that can be safely returned
 * to the client.
 *
 * Examples:
 *  - Validation errors
 *  - Authentication failures
 *  - Authorization failures
 *  - Resource not found
 *  - Duplicate resource
 * ===============================================================
 */

class AppError extends Error {
    /**
     * Creates a new application error.
     *
     * @param {string} message - Error message.
     * @param {number} [statusCode=500] - HTTP status code.
     * @param {*} [details=null] - Optional additional error details.
     */
    constructor(message, statusCode = 500, details = null) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.details = details;

        /**
         * Indicates that this is an expected operational error.
         * Unexpected programming errors should not set this.
         */
        this.isOperational = true;

        /**
         * Preserve the correct stack trace.
         */
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Common helper methods.
     */

    static badRequest(message = "Bad Request.", details = null) {
        return new AppError(message, 400, details);
    }

    static unauthorized(message = "Unauthorized.", details = null) {
        return new AppError(message, 401, details);
    }

    static forbidden(message = "Forbidden.", details = null) {
        return new AppError(message, 403, details);
    }

    static notFound(message = "Resource not found.", details = null) {
        return new AppError(message, 404, details);
    }

    static conflict(message = "Resource already exists.", details = null) {
        return new AppError(message, 409, details);
    }

    static validation(message = "Validation failed.", details = null) {
        return new AppError(message, 422, details);
    }

    static internal(message = "Internal Server Error.", details = null) {
        return new AppError(message, 500, details);
    }
}

export default AppError;