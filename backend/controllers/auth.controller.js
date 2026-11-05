
"use strict";

import jwt from "jsonwebtoken";

import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { env } from "../config/index.js";

import {
    registerSchema,
    loginSchema
} from "../validators/auth.validator.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Authentication Controller
 * ---------------------------------------------------------------
 * Handles user registration, login and logout operations.
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

    // 2. Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw AppError.conflict(
            "An account with this email address already exists."
        );
    }

    // 3. Create user
    let user;

    try {
        user = await User.create({
            fullName,
            email,
            password
        });
    } catch (err) {
        if (err.code === 11000) {
            throw AppError.conflict(
                "An account with this email address already exists."
            );
        }

        throw err;
    }

    // 4. Safe response data
    const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    // 5. Send response
    return ApiResponse.success(
        res,
        "Your account has been created successfully.",
        { user: safeUser },
        201
    );
});

/**
 * Login an existing user.
 * POST /api/v1/auth/login
 */
const loginUser = asyncHandler(async (req, res) => {

    // 1. Validate login data
    const { error, value } = loginSchema.validate(req.body, {
        abortEarly: false,
        convert: true
    });

    if (error) {
        const details = error.details.map((item) => ({
            field: item.path.join("."),
            message: item.message
        }));

        throw AppError.validation(
            "Login validation failed.",
            details
        );
    }

    const { email, password } = value;

    // 2. Find user and include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw AppError.unauthorized(
            "Invalid email or password."
        );
    }

    // 3. Check account status
    if (!user.isActive) {
        throw AppError.forbidden(
            "Your account is inactive."
        );
    }

    // 4. Compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw AppError.unauthorized(
            "Invalid email or password."
        );
    }

    // 5. Generate JWT
    const token = jwt.sign(
        {
            role: user.role
        },
        env.JWT_SECRET,
        {
            subject: user._id.toString(),
            expiresIn: env.JWT_EXPIRES_IN
        }
    );

    // 6. Configure cookie
    const cookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    // 7. Set JWT cookie
    res.cookie("sdlc_token", token, cookieOptions);

    // 8. Safe user data
    const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    // 9. Send successful response
    return ApiResponse.success(
        res,
        "Login successful.",
        { user: safeUser }
    );
});

/**
 * Logout the current user.
 * POST /api/v1/auth/logout
 */
const logoutUser = asyncHandler(async (req, res) => {

    // 1. Configure cookie clearing options
    const cookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
    };

    // 2. Clear authentication cookie
    res.clearCookie("sdlc_token", cookieOptions);

    // 3. Send logout response
    return ApiResponse.success(
        res,
        "Logout successful.",
        null
    );
});


/**
 * Get the currently authenticated user's profile.
 * GET /api/v1/auth/me
 */
const getCurrentUser = asyncHandler(async (req, res) => {

    // 1. Get authenticated user ID
    const userId = req.user.id;

    // 2. Find user in database
    const user = await User.findById(userId);

    if (!user) {
        throw AppError.unauthorized(
            "User account not found."
        );
    }

    // 3. Check account status
    if (!user.isActive) {
        throw AppError.forbidden(
            "Your account is inactive."
        );
    }

    // 4. Prepare safe user data
    const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    };

    // 5. Send response
    return ApiResponse.success(
        res,
        "User profile retrieved successfully.",
        { user: safeUser }
    );
});


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};
