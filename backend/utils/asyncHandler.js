
"use strict";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Async Handler Utility
 * ---------------------------------------------------------------
 * Wraps asynchronous controller functions and forwards
 * rejected promises to Express error-handling middleware.
 * ===============================================================
 */

/**
 * Wrap an asynchronous route handler.
 *
 * @param {Function} requestHandler
 * @returns {Function}
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch(next);
    };
};

export default asyncHandler;
