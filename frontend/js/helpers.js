
"use strict";

// Check whether a value is empty
export function isEmpty(value) {
    return value === null ||
        value === undefined ||
        String(value).trim() === "";
}

// Validate an email address
export function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(String(email).trim());
}

// Check minimum string length
export function meetsMinLength(value, minLength) {
    return String(value ?? "").length >= minLength;
}

// Check whether two passwords match
export function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// Safely format a date
export function formatDate(dateValue, locale = "en-IN") {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Invalid date";
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
}

// Format a number as a readable value
export function formatNumber(value, locale = "en-IN") {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "0";
    }

    return new Intl.NumberFormat(locale).format(number);
}

// Escape HTML special characters before inserting untrusted text into HTML
export function escapeHTML(value) {
    const characters = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value ?? "").replace(/[&<>"']/g, character =>
        characters[character]
    );
}

// Read a value from local storage safely
export function getStoredValue(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn("Unable to read local storage:", error);
        return null;
    }
}

// Save a value to local storage safely
export function setStoredValue(key, value) {
    try {
        localStorage.setItem(key, String(value));
        return true;
    } catch (error) {
        console.warn("Unable to save to local storage:", error);
        return false;
    }
}

// Remove a value from local storage safely
export function removeStoredValue(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn("Unable to remove local storage value:", error);
        return false;
    }
}
