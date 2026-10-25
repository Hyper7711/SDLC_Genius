
"use strict";

// SDLC Genius frontend configuration

export const APP_CONFIG = Object.freeze({
    APP_NAME: "SDLC Genius",
    APP_VERSION: "1.0.0",

    // Local backend API
    API_BASE_URL: "http://localhost:5000/api/v1",

    // Request timeout in milliseconds
    API_TIMEOUT: 15000
});

// Common API endpoints
export const API_ENDPOINTS = Object.freeze({
    HEALTH: "/health",
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/me"
});
