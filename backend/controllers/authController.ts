import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/company";
import sendOtpVerificationEmail from "../utils/email";
import { generateOTP, hashOTP, sendPhoneOTP, verifyOTP } from "../utils/otp";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
    console.log()
    const { name, email, phoneNumber, companyName, employeeSize } = req.body;

    try {
        const newCompany = new Company({
            name,
            email,
            phoneNumber,
            companyName,
            employeeSize
        });
        await newCompany.save();

        const verificationToken = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET as string);

        const emailOtp = generateOTP();
        await sendOtpVerificationEmail(newCompany.email, emailOtp);
        const hashedEmailOtp = await hashOTP(emailOtp)
        console.log(hashedEmailOtp)

        const mobileOtp = generateOTP();
        await sendPhoneOTP(newCompany.phoneNumber, mobileOtp);
        const hashedMobileOtp = await hashOTP(mobileOtp)
        console.log(hashedMobileOtp)

        const out = await Company.findByIdAndUpdate(newCompany._id, { phoneOtp: hashedMobileOtp, emailOtp: hashedEmailOtp })
        console.log(out)
        res.status(201).json(
            { 
                message: "Registration successful, Verify your Email and Phone Number",
                token: verificationToken
            });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error registering company" });
    }
};

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

export const verifyEmailOtp = async (req: Request, res: Response): Promise<void> => {
    const { otp } = req.body;
    try {

        const companyId = req.company.id;
        console.log(companyId);
        const company = await Company.findById(companyId);
        if (!company) {
            res.status(404).json({ error: "Company not found" });
            return;
        }

        const verify = await verifyOTP(otp, company.emailOtp)

        company.emailVerified = verify;
        await company.save();
        if(verify){
            res.status(200).json({ message: "Email verified successfully!" });
            return;
        }
        res.status(401).json({ message: "Incorrect OTP" });
        return; 
    } catch (error) {
        res.status(400).json({ error: "Error Try again later" });
        return;
    }
};

export const verifyMobileOtp = async (req: Request, res: Response): Promise<void> => {
    const { otp } = req.body;
    try {

        const companyId = req.company.id;
        console.log(companyId);
        const company = await Company.findById(companyId);
        if (!company) {
            res.status(404).json({ error: "Company not found" });
            return;
        }

        const verify = await verifyOTP(otp, company.phoneOtp)

        company.phoneVerified = verify;
        await company.save();

        if(verify){
            res.status(200).json({ message: "M verified successfully!" });
            return;
        }
        res.status(401).json({ message: "Incorrect OTP" });
        return; 
    } catch (error) {
        res.status(400).json({ error: "Error Try again later" });
        return;
    }
};

