
"use strict";

import Joi from "joi";

// Registration validation schema
const registerSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Full name is required.",
            "string.min": "Full name must contain at least 2 characters.",
            "string.max": "Full name cannot exceed 100 characters."
        }),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .max(254)
        .required()
        .messages({
            "string.email": "Please enter a valid email address.",
            "string.empty": "Email address is required."
        }),

    password: Joi.string()
        .min(8)
        .max(72)
        .required()
        .messages({
            "string.min": "Password must contain at least 8 characters.",
            "string.max": "Password cannot exceed 72 characters."
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Passwords do not match.",
            "string.empty": "Please confirm your password."
        })
}).unknown(false);

// Login validation schema
const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email address.",
            "string.empty": "Email address is required."
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required."
        })
}).unknown(false);

// Export schemas
export {
    registerSchema,
    loginSchema
};
