/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * Winston Logger Configuration
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Console logging
 *  - File logging
 *  - Error logging
 *  - Timestamp formatting
 * ===============================================================
 */

import winston from "winston";
import env from "./env.js";

const { combine, timestamp, colorize, printf, errors } = winston.format;

/**
 * Custom log format
 */
const logFormat = printf(
    ({ level, message, timestamp, stack }) => {
        return stack
            ? `${timestamp} [${level}] : ${stack}`
            : `${timestamp} [${level}] : ${message}`;
    }
);

/**
 * Logger Instance
 */
const logger = winston.createLogger({
    level: env.LOG_LEVEL,

    format: combine(
        errors({ stack: true }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
    ),

    defaultMeta: {
        service: env.APP_NAME,
    },

    transports: [
        /**
         * Error Log
         */
        new winston.transports.File({
            filename: "backend/logs/error.log",
            level: "error",
        }),

        /**
         * Combined Log
         */
        new winston.transports.File({
            filename: "backend/logs/combined.log",
        }),
    ],

    exceptionHandlers: [
        new winston.transports.File({
            filename: "backend/logs/exceptions.log",
        }),
    ],

    rejectionHandlers: [
        new winston.transports.File({
            filename: "backend/logs/rejections.log",
        }),
    ],
});

/**
 * Development Console Logger
 */
if (env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({
                    format: "HH:mm:ss",
                }),
                logFormat
            ),
        })
    );
}

export default logger;