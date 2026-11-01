
"use strict";

import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { registerSchema } from "../validators/auth.validator.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Authentication Controller
 * ---------------------------------------------------------------
 * Handles user registration and authentication operations.
 * ===============================================================
 */

/**
 * Register a new user.
 * POST /api/v1/auth/register
 */
const registerUser = asyncHandler(async (req, res) => {

    // 1. Validate registration data
    const { error, value } = registerSchema.validate(req.body, {
        abortEarly: false,
        convert: true
    });

    if (error) {
        const details = error.details.map((item) => ({
            field: item.path.join("."),
            message: item.message
        }));

        throw AppError.validation(
            "Registration validation failed.",
            details
        );
    }

    const { fullName, email, password } = value;

    // 2. Check whether the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw AppError.conflict(
            "An account with this email address already exists."
        );
    }

    // 3. Create the user
    // Password hashing is handled by User.js middleware.
    let user;

    try {
        user = await User.create({
            fullName,
            email,
            password
        });
    } catch (err) {
        // Handle duplicate email in case of simultaneous requests.
        if (err.code === 11000) {
            throw AppError.conflict(
                "An account with this email address already exists."
            );
        }

        throw err;
    }

    // 4. Prepare safe user data
    const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    // 5. Send success response
    return ApiResponse.success(
        res,
        "Your account has been created successfully.",
        { user: safeUser },
        201
    );
});

export {
    registerUser
};
