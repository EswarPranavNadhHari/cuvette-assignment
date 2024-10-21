import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();

export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendPhoneOTP = async (phone: string) => {
  const appKey = process.env.RINGCAPTCHA_APP_KEY;
  const apiKey = process.env.RINGCAPTCHA_API_KEY
  
  try {
    const response = await fetch(`https://api.ringcaptcha.com/${appKey}/code/sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, apiKey}),
    });

    const data = await response.json();

    if (data.status === 'SUCCESS') {
      console.log('OTP sent successfully.');
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

export const hashOTP = async (otp: string): Promise<string> => {
  return await bcrypt.hash(otp, 12);
};

export const verifyEmailOTP = async (inputOTP: string, hashedOTP: string): Promise<boolean> => {
  return await bcrypt.compare(inputOTP, hashedOTP);
};

export const verifyMobileOTP = async (phone: string, inputOTP: string): Promise<boolean> => {
  const appKey = process.env.RINGCAPTCHA_APP_KEY;
  const apiKey = process.env.RINGCAPTCHA_API_KEY

  try {
    const response = await fetch(`https://api.ringcaptcha.com/${appKey}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, code: inputOTP, apiKey }),
    });

    const data = await response.json();

    return data.status === 'SUCCESS';
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
};