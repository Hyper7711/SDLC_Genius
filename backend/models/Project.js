
"use strict";

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Project name is required."],
            trim: true,
            minlength: [2, "Project name must contain at least 2 characters."],
            maxlength: [100, "Project name cannot exceed 100 characters."]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [2000, "Project description cannot exceed 2000 characters."],
            default: ""
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "planning",
                "in-progress",
                "completed",
                "on-hold",
                "cancelled"
            ],
            default: "planning"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Index projects by owner
projectSchema.index({ owner: 1, createdAt: -1 });

// Export Project model
const Project =
    mongoose.models.Project ||
    mongoose.model("Project", projectSchema);

export default Project;
