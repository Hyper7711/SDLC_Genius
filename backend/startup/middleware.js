/**
 * ================================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Middleware Registration
 * ---------------------------------------------------------------
 * Registers all global middleware used by the application.
 *
 * Order Matters:
 * 1. Security
 * 2. CORS
 * 3. Compression
 * 4. Cookie Parser
 * 5. Body Parsers
 * 6. Request Logger
 * ================================================================
 */

import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";

/**
 * Register all application middleware.
 *
 * @param {import("express").Express} app
 */
const registerMiddleware = (app) => {
    /*
    |--------------------------------------------------------------------------
    | Security Headers
    |--------------------------------------------------------------------------
    */

    app.use(helmet());

    /*
    |--------------------------------------------------------------------------
    | Enable CORS
    |--------------------------------------------------------------------------
    */

    app.use(
        cors({
            origin: process.env.CLIENT_URL || "*",
            credentials: true,
        })
    );

    /*
    |--------------------------------------------------------------------------
    | Compress Response
    |--------------------------------------------------------------------------
    */

    app.use(compression());

    /*
    |--------------------------------------------------------------------------
    | Parse Cookies
    |--------------------------------------------------------------------------
    */

    app.use(cookieParser());

    /*
    |--------------------------------------------------------------------------
    | Parse JSON Body
    |--------------------------------------------------------------------------
    */

    app.use(
        express.json({
            limit: "10mb",
        })
    );

    /*
    |--------------------------------------------------------------------------
    | Parse URL Encoded Body
    |--------------------------------------------------------------------------
    */

    app.use(
        express.urlencoded({
            extended: true,
            limit: "10mb",
        })
    );

    /*
    |--------------------------------------------------------------------------
    | HTTP Request Logger
    |--------------------------------------------------------------------------
    */

    app.use(morgan("dev"));
};

export default registerMiddleware;