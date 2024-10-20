"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const companySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    companyName: { type: String, required: true, unique: true },
    employeeSize: { type: String, required: true },
    phoneOtp: { type: String },
    emailOtp: { type: String },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    jobs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Job" }],
});
exports.default = (0, mongoose_1.model)("Company", companySchema);
