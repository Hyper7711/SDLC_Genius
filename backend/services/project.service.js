
"use strict";

import mongoose from "mongoose";

import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Project Service
 * ---------------------------------------------------------------
 * Handles database operations for project management.
 * ===============================================================
 */

/**
 * Create a new project.
 *
 * @param {Object} projectData
 * @param {string} userId
 * @returns {Promise<Object>}
 */
const createProject = async (projectData, userId) => {
    const project = await Project.create({
        name: projectData.name,
        description: projectData.description ?? "",
        owner: userId
    });

    return project;
};

/**
 * Get all projects belonging to a user.
 *
 * @param {string} userId
 * @returns {Promise<Array>}
 */
const getAllProjects = async (userId) => {
    return Project.find({ owner: userId })
        .sort({ createdAt: -1 })
        .lean();
};

/**
 * Get a project by ID belonging to a user.
 *
 * @param {string} projectId
 * @param {string} userId
 * @returns {Promise<Object>}
 */
const getProjectById = async (projectId, userId) => {
    if (!mongoose.isValidObjectId(projectId)) {
        throw AppError.badRequest("Invalid project ID.");
    }

    const project = await Project.findOne({
        _id: projectId,
        owner: userId
    }).lean();

    if (!project) {
        throw AppError.notFound("Project not found.");
    }

    return project;
};

/**
 * Update a project belonging to a user.
 *
 * @param {string} projectId
 * @param {string} userId
 * @param {Object} updateData
 * @returns {Promise<Object>}
 */
const updateProject = async (projectId, userId, updateData) => {
    if (!mongoose.isValidObjectId(projectId)) {
        throw AppError.badRequest("Invalid project ID.");
    }

    const project = await Project.findOneAndUpdate(
        {
            _id: projectId,
            owner: userId
        },
        {
            $set: updateData
        },
        {
            new: true,
            runValidators: true
        }
    ).lean();

    if (!project) {
        throw AppError.notFound("Project not found.");
    }

    return project;
};

/**
 * Delete a project belonging to a user.
 *
 * @param {string} projectId
 * @param {string} userId
 * @returns {Promise<Object>}
 */
const deleteProject = async (projectId, userId) => {
    if (!mongoose.isValidObjectId(projectId)) {
        throw AppError.badRequest("Invalid project ID.");
    }

    const project = await Project.findOneAndDelete({
        _id: projectId,
        owner: userId
    }).lean();

    if (!project) {
        throw AppError.notFound("Project not found.");
    }

    return project;
};

// Export project service functions
export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
