"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobs = exports.postJob = void 0;
const job_1 = __importDefault(require("../models/job"));
const email_1 = require("../utils/email");
const postJob = async (req, res) => {
    const { title, description, experienceLevel, candidates, endDate } = req.body;
    try {
        const newJob = await job_1.default.create({
            title,
            description,
            experienceLevel,
            candidates,
            endDate,
            postedBy: req.company.id,
        });
        await (0, email_1.sendJobAlertEmails)(candidates, newJob);
        res.status(201).json({ message: "Job posted successfully", job: newJob });
    }
    catch (error) {
        res.status(400).json({ error: "Error posting the job" });
    }
};
exports.postJob = postJob;
const getAllJobs = async (req, res) => {
    try {
        const jobs = await job_1.default.find().populate("postedBy", "name email");
        res.status(200).json(jobs);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching jobs" });
    }
};
exports.getAllJobs = getAllJobs;
