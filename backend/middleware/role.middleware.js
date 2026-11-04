
"use strict";

import AppError from "../utils/AppError.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Role Authorization Middleware
 * ---------------------------------------------------------------
 * Restricts access based on user roles.
 * ===============================================================
 */

/**
 * Authorize users based on allowed roles.
 *
 * Usage:
 * authorizeRoles("admin")
 * authorizeRoles("admin", "user")
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        // 1. Check authentication
        if (!req.user) {
            return next(
                AppError.unauthorized(
                    "Authentication required. Please login."
                )
            );
        }

        // 2. Check user role
        if (!allowedRoles.includes(req.user.role)) {
            return next(
                AppError.forbidden(
                    "You do not have permission to access this resource."
                )
            );
        }

        // 3. Allow access
        return next();
    };
};

export {
    authorizeRoles
};