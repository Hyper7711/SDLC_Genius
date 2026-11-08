
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


/**
 * Update a registered user.
 * PATCH /api/v1/users/:id
 */
const updateUser = asyncHandler(async (req, res) => {

    // 1. Get user ID from route parameters
    const { id } = req.params;

    // 2. Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw AppError.badRequest("Invalid user ID.");
    }

    // 3. Allowed fields for update
    const allowedFields = [
        "fullName",
        "email",
        "role",
        "isActive"
    ];

    // 4. Check whether request contains valid fields
    const updates = {};

    for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(req.body, field)) {
            updates[field] = req.body[field];
        }
    }

    // 5. Prevent empty update requests
    if (Object.keys(updates).length === 0) {
        throw AppError.badRequest(
            "Please provide at least one field to update."
        );
    }

    // 6. Validate full name
    if (updates.fullName !== undefined) {
        if (
            typeof updates.fullName !== "string" ||
            updates.fullName.trim().length < 2 ||
            updates.fullName.trim().length > 100
        ) {
            throw AppError.badRequest(
                "Full name must contain 2 to 100 characters."
            );
        }

        updates.fullName = updates.fullName.trim();
    }

    // 7. Validate email
    if (updates.email !== undefined) {
        if (
            typeof updates.email !== "string" ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email.trim())
        ) {
            throw AppError.badRequest(
                "Please provide a valid email address."
            );
        }

        updates.email = updates.email.trim().toLowerCase();

        // Check whether email is already used
        const existingUser = await User.findOne({
            email: updates.email,
            _id: { $ne: id }
        });

        if (existingUser) {
            throw AppError.conflict(
                "Email address is already registered."
            );
        }
    }

    // 8. Validate role
    if (updates.role !== undefined) {
        if (!["user", "admin"].includes(updates.role)) {
            throw AppError.badRequest(
                "Role must be user or admin."
            );
        }
    }

    // 9. Validate active status
    if (updates.isActive !== undefined) {
        if (typeof updates.isActive !== "boolean") {
            throw AppError.badRequest(
                "isActive must be true or false."
            );
        }
    }

    // 10. Update user in database
    const user = await User.findByIdAndUpdate(
        id,
        { $set: updates },
        {
            new: true,
            runValidators: true
        }
    );

    // 11. Check whether user exists
    if (!user) {
        throw AppError.notFound("User not found.");
    }

    // 12. Prepare safe user data
    const safeUser = {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    // 13. Send response
    return ApiResponse.success(
        res,
        "User updated successfully.",
        {
            user: safeUser
        }
    );
});


/**
 * Delete a registered user.
 * DELETE /api/v1/users/:id
 */
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw AppError.badRequest("Invalid user ID.");
    }

    // Prevent admin from deleting their own account
    if (req.user.id === id) {
        throw AppError.badRequest(
            "You cannot delete your own account."
        );
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);

    // Check if user exists
    if (!user) {
        throw AppError.notFound("User not found.");
    }

    // Return success response
    return ApiResponse.success(
        res,
        "User deleted successfully.",
        {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        }
    );
});


export {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
