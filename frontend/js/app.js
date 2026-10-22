
/* =========================================================
   SDLC GENIUS — FRONTEND APPLICATION ENTRY POINT
   File: frontend/js/app.js
   ========================================================= */

import {
    initializeMobileNavigation,
    initializeFooterYear
} from "./ui.js";

/**
 * Initialize the frontend application.
 */
function initializeApp() {
    initializeMobileNavigation();
    initializeFooterYear();

    console.info("SDLC Genius frontend initialized successfully.");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp, {
        once: true
    });
} else {
    initializeApp();
}
