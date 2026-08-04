/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Application Constants
 * ---------------------------------------------------------------
 * Centralized location for application-wide constants.
 *
 * NOTE:
 * Never hardcode these values elsewhere.
 * Import them from this file.
 * ===============================================================
 */

const constants = Object.freeze({
    /**
     * ------------------------------------------------------------
     * Application
     * ------------------------------------------------------------
     */
    APP: {
        NAME: "SDLC Genius",
        VERSION: "1.0.0",
    },

    /**
     * ------------------------------------------------------------
     * API
     * ------------------------------------------------------------
     */
    API: {
        PREFIX: "/api",
        VERSION: "v1",
        BASE_PATH: "/api/v1",
    },

    /**
     * ------------------------------------------------------------
     * HTTP Status Codes
     * ------------------------------------------------------------
     */
    HTTP_STATUS: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,

        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        UNPROCESSABLE_ENTITY: 422,

        INTERNAL_SERVER_ERROR: 500,
        SERVICE_UNAVAILABLE: 503,
    },

    /**
     * ------------------------------------------------------------
     * Pagination
     * ------------------------------------------------------------
     */
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
        MAX_LIMIT: 100,
    },

    /**
     * ------------------------------------------------------------
     * File Upload
     * ------------------------------------------------------------
     */
    FILES: {
        IMAGE_TYPES: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
        ],

        DOCUMENT_TYPES: [
            "application/pdf",
            "text/plain",
            "application/json",
        ],
    },

    /**
     * ------------------------------------------------------------
     * Authentication
     * ------------------------------------------------------------
     */
    AUTH: {
        BEARER_PREFIX: "Bearer",
        PASSWORD_MIN_LENGTH: 8,
    },

    /**
     * ------------------------------------------------------------
     * AI Engine
     * ------------------------------------------------------------
     */
    AI: {
        DEFAULT_TEMPERATURE: 0.2,
        DEFAULT_MAX_TOKENS: 4096,
    },
});

export default constants;