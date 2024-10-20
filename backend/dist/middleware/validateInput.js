"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_js_1 = require("../utils/validation.js");
const validateJobInput = (req, res, next) => {
    const { error } = validation_js_1.jobPostSchema.safeParse(req.body);
    if (error) {
        res.status(400).json({ error: "Incorrect input" });
        return;
    }
    next();
};
exports.default = validateJobInput;
