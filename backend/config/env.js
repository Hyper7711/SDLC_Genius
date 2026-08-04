/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Environment Configuration
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Load environment variables
 *  - Validate required configuration
 *  - Export a centralized configuration object
 *
 * NOTE:
 * Never access process.env directly outside this file.
 * Always import the exported `env` object.
 * ===============================================================
 */

import dotenv from "dotenv";
import Joi from "joi";

/**
 * Load environment variables.
 */
dotenv.config({
    path: ".env",
});

/**
 * Environment variable validation schema.
 */
const schema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production", "test")
        .default("development"),

    PORT: Joi.number()
        .port()
        .default(5000),

    APP_NAME: Joi.string()
        .default("SDLC Genius"),

    APP_VERSION: Joi.string()
        .default("1.0.0"),

    MONGODB_URI: Joi.string()
        .required(),

    LOG_LEVEL: Joi.string()
        .default("info"),

    CLIENT_URL: Joi.string()
        .uri()
        .required(),

    JWT_SECRET: Joi.string()
        .min(16)
        .required(),

    JWT_EXPIRES_IN: Joi.string()
        .default("7d"),

    OLLAMA_BASE_URL: Joi.string()
        .uri()
        .required(),

    DEFAULT_AI_MODEL: Joi.string()
        .default("qwen3"),

    MAX_FILE_SIZE: Joi.number()
        .default(10485760),

    UPLOAD_DIRECTORY: Joi.string()
        .default("backend/uploads")
})
    .unknown(true);

/**
 * Validate environment variables.
 */
const { value, error } = schema.validate(process.env);

if (error) {
    console.error("\n=================================================");
    console.error("❌ Environment Configuration Error");
    console.error("=================================================");
    console.error(error.message);
    console.error("=================================================\n");

    process.exit(1);
}

/**
 * Immutable environment configuration.
 */
const env = Object.freeze({
    NODE_ENV: value.NODE_ENV,
    PORT: value.PORT,

    APP_NAME: value.APP_NAME,
    APP_VERSION: value.APP_VERSION,

    MONGODB_URI: value.MONGODB_URI,

    LOG_LEVEL: value.LOG_LEVEL,

    CLIENT_URL: value.CLIENT_URL,

    JWT_SECRET: value.JWT_SECRET,
    JWT_EXPIRES_IN: value.JWT_EXPIRES_IN,

    OLLAMA_BASE_URL: value.OLLAMA_BASE_URL,
    DEFAULT_AI_MODEL: value.DEFAULT_AI_MODEL,

    MAX_FILE_SIZE: value.MAX_FILE_SIZE,
    UPLOAD_DIRECTORY: value.UPLOAD_DIRECTORY,
});

export default env;