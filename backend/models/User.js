
"use strict";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required."],
            trim: true,
            minlength: [2, "Full name must contain at least 2 characters."],
            maxlength: [100, "Full name cannot exceed 100 characters."]
        },

        email: {
            type: String,
            required: [true, "Email address is required."],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
            index: true
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [8, "Password must contain at least 8 characters."],
            select: false
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Hash password before saving the user
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

// Compare entered password with stored password hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Export User model
const User =
    mongoose.models.User ||
    mongoose.model("User", userSchema);

export default User;
