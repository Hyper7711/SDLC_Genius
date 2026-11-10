
"use strict";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";

import {
    createProject as createProjectService,
    getAllProjects as getAllProjectsService,
    getProjectById as getProjectByIdService,
    updateProject as updateProjectService,
    deleteProject as deleteProjectService
} from "../services/project.service.js";

/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Project Controller
 * ---------------------------------------------------------------
 * Handles HTTP requests for project management.
 * ===============================================================
 */

/**
 * Create a new project.
 * POST /api/v1/projects
 */
const createProject = asyncHandler(async (req, res) => {
    const project = await createProjectService(
        req.body,
        req.user.id
    );

    return ApiResponse.success(
        res,
        "Project created successfully.",
        { project },
        201
    );
});

/**
 * Get all projects belonging to the authenticated user.
 * GET /api/v1/projects
 */
const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await getAllProjectsService(req.user.id);

    return ApiResponse.success(
        res,
        "Projects retrieved successfully.",
        { projects }
    );
});

/**
 * Get a project by ID.
 * GET /api/v1/projects/:id
 */
const getProjectById = asyncHandler(async (req, res) => {
    const project = await getProjectByIdService(
        req.params.id,
        req.user.id
    );

    return ApiResponse.success(
        res,
        "Project retrieved successfully.",
        { project }
    );
});

/**
 * Update a project.
 * PATCH /api/v1/projects/:id
 */
const updateProject = asyncHandler(async (req, res) => {
    const project = await updateProjectService(
        req.params.id,
        req.user.id,
        req.body
    );

    return ApiResponse.success(
        res,
        "Project updated successfully.",
        { project }
    );
});

/**
 * Delete a project.
 * DELETE /api/v1/projects/:id
 */
const deleteProject = asyncHandler(async (req, res) => {
    const project = await deleteProjectService(
        req.params.id,
        req.user.id
    );

    return ApiResponse.success(
        res,
        "Project deleted successfully.",
        {
            project: {
                id: project._id,
                name: project.name,
                owner: project.owner
            }
        }
    );
});

// Export project controllers
export {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
};
