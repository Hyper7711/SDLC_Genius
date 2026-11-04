
"use strict";

import jwt from "jsonwebtoken";

import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

import { env } from "../config/index.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Authentication Middleware
 * ---------------------------------------------------------------
 * Verifies JWT authentication cookies and identifies users.
 * ===============================================================
 */

/**
 * Authenticate user using JWT cookie.
 *
 * Cookie:
 * sdlc_token
 *
 * Usage:
 * router.get("/protected", authenticateUser, controller);
 */
const authenticateUser = asyncHandler(async (req, res, next) => {

    // 1. Read authentication token from cookie
    const token = req.cookies?.sdlc_token;

    if (!token) {
        throw AppError.unauthorized(
            "Authentication required. Please login."
        );
    }

    // 2. Verify JWT token
    let decoded;

    try {
        decoded = jwt.verify(token, env.JWT_SECRET);
    } catch (error) {

        if (error.name === "TokenExpiredError") {
            throw AppError.unauthorized(
                "Your session has expired. Please login again."
            );
        }

        if (error.name === "JsonWebTokenError") {
            throw AppError.unauthorized(
                "Invalid authentication token."
            );
        }

        throw error;
    }

    // 3. Find authenticated user
    const user = await User.findById(decoded.sub);

    if (!user) {
        throw AppError.unauthorized(
            "User account not found."
        );
    }

    // 4. Check account status
    if (!user.isActive) {
        throw AppError.forbidden(
            "Your account is inactive."
        );
    }

    // 5. Attach user information to request
    req.user = {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role
    };

    // 6. Continue to next middleware/controller
    next();
});

export {
    authenticateUser
};
