/**
 * ===============================================================
 * SDLC Genius
 * ---------------------------------------------------------------
 * MongoDB Database Configuration
 * ---------------------------------------------------------------
 * Responsibilities:
 *  - Connect to MongoDB using Mongoose
 *  - Handle connection success and failure
 *  - Export reusable database connection function
 * ===============================================================
 */

import mongoose from "mongoose";
import env from "./env.js";

/**
 * Connect to MongoDB.
 *
 * @returns {Promise<void>}
 */
const connectDatabase = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);

        console.log("=================================================");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`Database : ${mongoose.connection.name}`);
        console.log(`Host     : ${mongoose.connection.host}`);
        console.log("=================================================");
    } catch (error) {
        console.error("=================================================");
        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);
        console.error("=================================================");

        process.exit(1);
    }
};

/**
 * MongoDB Connection Events
 */

mongoose.connection.on("connected", () => {
    console.log("📦 MongoDB connection established.");
});

mongoose.connection.on("disconnected", () => {
    console.warn("⚠ MongoDB disconnected.");
});

mongoose.connection.on("error", (error) => {
    console.error("❌ MongoDB Error:", error.message);
});

/**
 * Export Database Connection Function
 */
export default connectDatabase;
