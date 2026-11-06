
"use strict";

import mongoose from "mongoose";
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


/**
 * Get a registered user by ID.
 * GET /api/v1/users/:id
 */
const getUserById = asyncHandler(async (req, res) => {

    // 1. Get user ID from route parameters
    const { id } = req.params;

    // 2. Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw AppError.badRequest("Invalid user ID.");
    }

    // 3. Find user by ID
    const user = await User.findById(id);

    // 4. Check whether user exists
    if (!user) {
        throw AppError.notFound("User not found.");
    }

    // 5. Prepare safe user data
    const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    // 6. Send response
    return ApiResponse.success(
        res,
        "User retrieved successfully.",
        {
            user: safeUser
        }
    );
});

export {
    getAllUsers,
    getUserById
};
