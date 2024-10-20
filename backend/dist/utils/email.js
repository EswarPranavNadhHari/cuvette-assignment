"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJobAlertEmails = void 0;
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const sendOtpVerificationEmail = async (companyEmail, otp) => {
    await nodemailer_1.default.sendMail({
        from: '"Job Board" <your-email@example.com>',
        to: companyEmail,
        subject: "Verify your account",
        text: `Your OTP for email verification is: ${otp}`,
    });
};
// Function to send job alerts to candidates
const sendJobAlertEmails = async (candidates, job) => {
    const jobDetails = `
    <h1>${job.title}</h1>
    <p>${job.description}</p>
    <p>Experience Level: ${job.experienceLevel}</p>
    <p>Apply before: ${job.endDate.toDateString()}</p>
  `;
    const mailOptions = {
        from: '"Job Board" <your-email@example.com>',
        subject: "New Job Alert",
        html: jobDetails,
    };
    for (const candidateEmail of candidates) {
        await nodemailer_1.default.sendMail({ ...mailOptions, to: candidateEmail });
    }
};
exports.sendJobAlertEmails = sendJobAlertEmails;
exports.default = sendOtpVerificationEmail;
