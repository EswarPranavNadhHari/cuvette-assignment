"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/register", authController_1.register);
// router.post("/login", login);
router.post("/verify/phone", authMiddleware_1.default, authController_1.verifyMobileOtp);
router.post("/verify/email", authMiddleware_1.default, authController_1.verifyEmailOtp);
exports.default = router;
