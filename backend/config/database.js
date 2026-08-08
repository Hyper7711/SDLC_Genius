/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * MongoDB Configuration
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Connect to MongoDB
 *  - Handle connection lifecycle
 *  - Log connection events
 *  - Export mongoose instance
 * ===============================================================
 */

import mongoose from "mongoose";

import env from "./env.js";
import logger from "./logger.js";

/**
 * Connect to MongoDB.
 *
 * @returns {Promise<void>}
 */
const connectDatabase = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);

        logger.info("=================================================");
        logger.info("✅ MongoDB Connected Successfully");
        logger.info(`Database : ${mongoose.connection.name}`);
        logger.info(`Host     : ${mongoose.connection.host}`);
        logger.info("=================================================");
    } catch (error) {
        logger.error("=================================================");
        logger.error("❌ MongoDB Connection Failed");
        logger.error(error.message);
        logger.error("=================================================");

        process.exit(1);
    }
};

/**
 * ===============================================================
 * Connection Events
 * ===============================================================
 */

mongoose.connection.on("connected", () => {
    logger.info("📦 MongoDB connection established.");
});

mongoose.connection.on("disconnected", () => {
    logger.warn("⚠ MongoDB disconnected.");
});

mongoose.connection.on("reconnected", () => {
    logger.info("🔄 MongoDB reconnected.");
});

mongoose.connection.on("error", (error) => {
    logger.error(error);
});

/**
 * Export
 */

export { mongoose };

export default connectDatabase;