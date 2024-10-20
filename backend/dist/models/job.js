"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    candidates: [{ type: String, required: true }],
    endDate: { type: Date, required: true },
    postedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company" },
});
exports.default = (0, mongoose_1.model)("Job", jobSchema);
