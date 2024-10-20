"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobPostSchema = void 0;
const zod_1 = require("zod");
// Zod schema for validating job post data
exports.jobPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(5, "Title must be at least 5 characters long"),
    description: zod_1.z.string().min(20, "Description must be at least 20 characters long"),
    experienceLevel: zod_1.z.enum(["junior", "mid", "senior"], {
        errorMap: () => ({ message: "Experience level must be one of 'junior', 'mid', or 'senior'" }),
    }),
    candidates: zod_1.z.array(zod_1.z.string().email("Each candidate must have a valid email")),
    endDate: zod_1.z.string().refine((date) => new Date(date) > new Date(), {
        message: "End date must be in the future",
    }),
});
