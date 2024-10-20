"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobController_1 = require("../controllers/jobController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const validateInput_1 = __importDefault(require("../middleware/validateInput"));
const router = (0, express_1.Router)();
router.post("/post", authMiddleware_1.default, validateInput_1.default, jobController_1.postJob);
router.get("/all", jobController_1.getAllJobs); // Public route to get all jobs
exports.default = router;
