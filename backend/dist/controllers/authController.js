"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMobileOtp = exports.verifyEmailOtp = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const company_1 = __importDefault(require("../models/company"));
const email_1 = __importDefault(require("../utils/email"));
const otp_1 = require("../utils/otp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = async (req, res) => {
    console.log();
    const { name, email, phoneNumber, companyName, employeeSize } = req.body;
    try {
        const newCompany = new company_1.default({
            name,
            email,
            phoneNumber,
            companyName,
            employeeSize
        });
        await newCompany.save();
        const verificationToken = jsonwebtoken_1.default.sign({ id: newCompany._id }, process.env.JWT_SECRET);
        const emailOtp = (0, otp_1.generateOTP)();
        await (0, email_1.default)(newCompany.email, emailOtp);
        const hashedEmailOtp = await (0, otp_1.hashOTP)(emailOtp);
        console.log(hashedEmailOtp);
        const mobileOtp = (0, otp_1.generateOTP)();
        await (0, otp_1.sendPhoneOTP)(newCompany.phoneNumber, mobileOtp);
        const hashedMobileOtp = await (0, otp_1.hashOTP)(mobileOtp);
        console.log(hashedMobileOtp);
        const out = await company_1.default.findByIdAndUpdate(newCompany._id, { phoneOtp: hashedMobileOtp, emailOtp: hashedEmailOtp });
        console.log(out);
        res.status(201).json({
            message: "Registration successful, Verify your Email and Phone Number",
            token: verificationToken
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Error registering company" });
    }
};
exports.register = register;
// export const login = async (req: Request, res: Response): Promise<void> => {
//     const { email } = req.body;
//     const company = await Company.findOne({ email });
//     if (!company) {
//         res.status(400).send("Company not found");
//         return;
//     }
//     if (!validPassword) {
//         res.status(400).send("Invalid credentials");
//         return;
//     }
//     const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
//     res.header("Authorization", token).json({ token, company: company._id });
// };
const verifyEmailOtp = async (req, res) => {
    const { otp } = req.body;
    try {
        const companyId = req.company.id;
        console.log(companyId);
        const company = await company_1.default.findById(companyId);
        if (!company) {
            res.status(404).json({ error: "Company not found" });
            return;
        }
        const verify = await (0, otp_1.verifyOTP)(otp, company.emailOtp);
        company.emailVerified = verify;
        await company.save();
        res.status(200).json({ message: "Email verified successfully!" });
        return;
    }
    catch (error) {
        res.status(400).json({ error: "Error Try again later" });
        return;
    }
};
exports.verifyEmailOtp = verifyEmailOtp;
const verifyMobileOtp = async (req, res) => {
    const { otp } = req.body;
    try {
        const companyId = req.company.id;
        console.log(companyId);
        const company = await company_1.default.findById(companyId);
        if (!company) {
            res.status(404).json({ error: "Company not found" });
            return;
        }
        const verify = await (0, otp_1.verifyOTP)(otp, company.phoneOtp);
        company.phoneVerified = verify;
        await company.save();
        res.status(200).json({ message: "Mobile verified successfully!" });
        return;
    }
    catch (error) {
        res.status(400).json({ error: "Error Try again later" });
        return;
    }
};
exports.verifyMobileOtp = verifyMobileOtp;
