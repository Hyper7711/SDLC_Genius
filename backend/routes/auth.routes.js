
"use strict";

import { Router } from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/auth.controller.js";

const router = Router();

// Register new user
router.post("/register", registerUser);

// Login existing user
router.post("/login", loginUser);

export default router;
