
/* =========================================================
   SDLC GENIUS — AUTHENTICATION FORM HANDLERS
   File: frontend/js/auth.js
   ========================================================= */

"use strict";

/**
 * Display a message in an authentication form.
 */
function showAuthMessage(element, message, type = "info") {
    if (!element) {
        return;
    }

    element.textContent = message;
    element.className = `auth-message ${type}`;
}

/**
 * Clear a form message.
 */
function clearAuthMessage(element) {
    if (!element) {
        return;
    }

    element.textContent = "";
    element.className = "auth-message";
}

/**
 * Validate the registration form.
 */
function initializeRegistrationForm() {
    const form = document.getElementById("registerForm");

    if (!form) {
        return;
    }

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const acceptTerms = document.getElementById("acceptTerms");
    const message = document.getElementById("registerMessage");

    form.addEventListener("input", () => {
        clearAuthMessage(message);
        confirmPassword.setCustomValidity("");
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearAuthMessage(message);

        const trimmedName = fullName.value.trim();

        if (trimmedName.length < 2) {
            showAuthMessage(
                message,
                "Please enter your full name (at least 2 characters).",
                "error"
            );
            fullName.focus();
            return;
        }

        if (!email.validity.valid) {
            showAuthMessage(
                message,
                "Please enter a valid email address.",
                "error"
            );
            email.focus();
            return;
        }

        if (password.value.length < 8) {
            showAuthMessage(
                message,
                "Your password must contain at least 8 characters.",
                "error"
            );
            password.focus();
            return;
        }

        if (password.value !== confirmPassword.value) {
            showAuthMessage(
                message,
                "The passwords do not match. Please try again.",
                "error"
            );
            confirmPassword.focus();
            return;
        }

        if (!acceptTerms.checked) {
            showAuthMessage(
                message,
                "Please accept the responsible-use policy to continue.",
                "error"
            );
            acceptTerms.focus();
            return;
        }

        showAuthMessage(
            message,
            "Form validation successful! Account creation will be available after backend authentication is connected.",
            "success"
        );

        console.info("Registration form validation passed.");
    });
}

/**
 * Validate the login form.
 */
function initializeLoginForm() {
    const form = document.getElementById("loginForm");

    if (!form) {
        return;
    }

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const message = document.getElementById("loginMessage");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");

    form.addEventListener("input", () => {
        clearAuthMessage(message);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearAuthMessage(message);

        if (!email.validity.valid || !email.value.trim()) {
            showAuthMessage(
                message,
                "Please enter a valid email address.",
                "error"
            );
            email.focus();
            return;
        }

        if (!password.value) {
            showAuthMessage(
                message,
                "Please enter your password.",
                "error"
            );
            password.focus();
            return;
        }

        showAuthMessage(
            message,
            "Your form is valid, but login is not connected to the backend yet.",
            "info"
        );

        console.info("Login form validation passed.");
    });

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (event) => {
            event.preventDefault();

            showAuthMessage(
                message,
                "Password recovery will be available after the authentication backend is implemented.",
                "info"
            );
        });
    }
}

/**
 * Initialize the appropriate form on the current page.
 */
function initializeAuthForms() {
    initializeRegistrationForm();
    initializeLoginForm();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAuthForms, {
        once: true
    });
} else {
    initializeAuthForms();
}
