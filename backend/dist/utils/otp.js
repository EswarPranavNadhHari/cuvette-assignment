"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.hashOTP = exports.sendPhoneOTP = exports.generateOTP = void 0;
const twilio_1 = __importDefault(require("twilio"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const generateOTP = () => {
    return crypto_1.default.randomInt(100000, 999999).toString(); // 6-digit OTP
};
exports.generateOTP = generateOTP;
const sendPhoneOTP = async (phone, otp) => {
    await twilioClient.messages.create({
        body: `Your OTP for phone verification is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
    });
};
exports.sendPhoneOTP = sendPhoneOTP;
const hashOTP = async (otp) => {
    return await bcryptjs_1.default.hash(otp, 12);
};
exports.hashOTP = hashOTP;
const verifyOTP = async (inputOTP, hashedOTP) => {
    return await bcryptjs_1.default.compare(inputOTP, hashedOTP);
};
exports.verifyOTP = verifyOTP;
