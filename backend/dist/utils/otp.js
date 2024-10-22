"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMobileOTP = exports.verifyEmailOTP = exports.hashOTP = exports.sendPhoneOTP = exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateOTP = () => {
    return crypto_1.default.randomInt(100000, 999999).toString();
};
exports.generateOTP = generateOTP;
const sendPhoneOTP = async (phone) => {
    const appKey = process.env.RINGCAPTCHA_APP_KEY;
    const apiKey = process.env.RINGCAPTCHA_API_KEY;
    if (!appKey || !apiKey) {
        throw new Error('Missing RingCaptcha app key or API key');
    }
    console.log(phone);
    try {
        const body = new URLSearchParams({
            phone: phone,
            api_key: apiKey,
        });
        const response = await fetch(`https://api.ringcaptcha.com/${appKey}/code/sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 'SUCCESS') {
            console.log('OTP sent successfully.');
        }
        else {
            throw new Error('Failed to send OTP');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error sending OTP: ${error.message}`);
        }
        else {
            throw new Error('Error sending OTP: An unknown error occurred');
        }
    }
};
exports.sendPhoneOTP = sendPhoneOTP;
const hashOTP = async (otp) => {
    return await bcryptjs_1.default.hash(otp, 12);
};
exports.hashOTP = hashOTP;
const verifyEmailOTP = async (inputOTP, hashedOTP) => {
    return await bcryptjs_1.default.compare(inputOTP, hashedOTP);
};
exports.verifyEmailOTP = verifyEmailOTP;
const verifyMobileOTP = async (phone, inputOTP) => {
    const appKey = process.env.RINGCAPTCHA_APP_KEY;
    const apiKey = process.env.RINGCAPTCHA_API_KEY;
    if (!appKey || !apiKey) {
        throw new Error('Missing RingCaptcha app key or API key');
    }
    try {
        const body = new URLSearchParams({
            phone: phone,
            code: inputOTP,
            api_key: apiKey,
        });
        const response = await fetch(`https://api.ringcaptcha.com/${appKey}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });
        const data = await response.json();
        console.log(data);
        return data.status === 'SUCCESS';
    }
    catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
};
exports.verifyMobileOTP = verifyMobileOTP;
