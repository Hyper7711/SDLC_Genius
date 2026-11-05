
"use strict";

import User from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * User Management Controller
 * ---------------------------------------------------------------
 * Handles user management operations.
 * ===============================================================
 */

/**
 * Get all registered users.
 * GET /api/v1/users
 */
const getAllUsers = asyncHandler(async (req, res) => {

    // 1. Retrieve users from database
    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    // 2. Prepare safe user data
    const safeUsers = users.map((user) => ({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }));

    // 3. Send response
    return ApiResponse.success(
        res,
        "Users retrieved successfully.",
        {
            totalUsers: safeUsers.length,
            users: safeUsers
        }
    );
});

export {
    getAllUsers
};
