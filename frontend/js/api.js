
"use strict";

import { APP_CONFIG } from "./config.js";

const API_BASE_URL = APP_CONFIG.API_BASE_URL;

// Custom error class for API failures
export class ApiError extends Error {
    constructor(message, status = 0, data = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

// Send an HTTP request to the backend
export async function apiRequest(
    endpoint,
    {
        method = "GET",
        body,
        headers = {},
        timeout = APP_CONFIG.API_TIMEOUT,
        credentials = "include"
    } = {}
) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const requestHeaders = {
            Accept: "application/json",
            ...headers
        };

        const options = {
            method,
            headers: requestHeaders,
            credentials,
            signal: controller.signal
        };

        if (body !== undefined) {
            requestHeaders["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }

        const response = await fetch(
            `${API_BASE_URL}${endpoint}`,
            options
        );

        const contentType = response.headers.get("content-type") || "";
        let data = null;

        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = text ? { message: text } : null;
        }

        if (!response.ok) {
            throw new ApiError(
                data?.message || `Request failed with status ${response.status}`,
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new ApiError(
                "The request timed out. Please try again."
            );
        }

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            "Unable to connect to the server. Check that the backend is running.",
            0,
            { originalMessage: error.message }
        );
    } finally {
        clearTimeout(timeoutId);
    }
}

// Check whether the backend health endpoint is responding
export async function checkBackendHealth() {
    return apiRequest("/health");
}

// Register a new user
export async function registerUser(userData) {
    return apiRequest("/auth/register", {
        method: "POST",
        body: userData
    });
}

// Log in an existing user
export async function loginUser(credentials) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: credentials
    });
}

// Log out the current user
export async function logoutUser() {
    return apiRequest("/auth/logout", {
        method: "POST"
    });
}

// Fetch the currently authenticated user's profile
export async function getCurrentUser() {
    return apiRequest("/auth/me");
}