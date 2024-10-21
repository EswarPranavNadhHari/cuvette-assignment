import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();

export const generateOTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendPhoneOTP = async (phone: string): Promise<void> => {
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

    const response = await fetch(`https://api.ringcaptcha.com/${appKey}/code/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',  
      },
      body: body.toString(),  
    });

    const data = await response.json();

    return data.status === 'SUCCESS';
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
};
