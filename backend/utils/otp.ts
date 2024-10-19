import twilio from 'twilio';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};

export const sendPhoneOTP = async (phone: string, otp: string) => {
  await twilioClient.messages.create({
    body: `Your OTP for phone verification is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

export const hashOTP = async (otp: string): Promise<string> => {
  return await bcrypt.hash(otp, 12);
};

export const verifyOTP = async (inputOTP: string, hashedOTP: string): Promise<boolean> => {
  return await bcrypt.compare(inputOTP, hashedOTP);
};
