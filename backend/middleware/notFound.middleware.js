/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Not Found Middleware
 * ---------------------------------------------------------------
 * Handles requests for undefined routes.
 *
 * This middleware should always be the LAST route middleware
 * registered before the global error handler.
 * ===============================================================
 */

import ApiResponse from "../utils/ApiResponse.js";

/**
 * Handles requests for routes that do not exist.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const notFoundMiddleware = (req, res, next) => {
    return ApiResponse.error(
        res,
        `Route '${req.originalUrl}' not found.`,
        404,
        {
            method: req.method,
            path: req.originalUrl,
        }
    );
};

export default notFoundMiddleware;