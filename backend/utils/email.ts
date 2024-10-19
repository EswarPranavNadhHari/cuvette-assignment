import transporter from "../config/nodemailer";
import { IJob } from "../models/job";

const sendOtpVerificationEmail = async (companyEmail: string, otp: string): Promise<void> => {  
  await transporter.sendMail({
    from: '"Job Board" <your-email@example.com>',
    to: companyEmail,
    subject: "Verify your account",
    text: `Your OTP for email verification is: ${otp}`,
  });
};

// Function to send job alerts to candidates
const sendJobAlertEmails = async (candidates: string[], job: IJob): Promise<void> => {
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
    await transporter.sendMail({ ...mailOptions, to: candidateEmail });
  }
};

export default sendOtpVerificationEmail;
export { sendJobAlertEmails };
