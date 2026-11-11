
"use strict";

import Joi from "joi";

// Allowed project statuses
const projectStatuses = [
    "planning",
    "in-progress",
    "completed",
    "on-hold",
    "cancelled"
];

// Create project validation schema
const createProjectSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Project name is required.",
            "string.min": "Project name must contain at least 2 characters.",
            "string.max": "Project name cannot exceed 100 characters."
        }),

    description: Joi.string()
        .trim()
        .max(2000)
        .allow("")
        .default("")
        .messages({
            "string.max": "Project description cannot exceed 2000 characters."
        }),

    status: Joi.string()
        .valid(...projectStatuses)
        .default("planning")
        .messages({
            "any.only": "Please provide a valid project status."
        })
}).unknown(false);

// Update project validation schema
const updateProjectSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .messages({
            "string.empty": "Project name cannot be empty.",
            "string.min": "Project name must contain at least 2 characters.",
            "string.max": "Project name cannot exceed 100 characters."
        }),

    description: Joi.string()
        .trim()
        .max(2000)
        .allow("")
        .messages({
            "string.max": "Project description cannot exceed 2000 characters."
        }),

    status: Joi.string()
        .valid(...projectStatuses)
        .messages({
            "any.only": "Please provide a valid project status."
        })
})
    .min(1)
    .unknown(false);

// Export validation schemas
export {
    createProjectSchema,
    updateProjectSchema
};
