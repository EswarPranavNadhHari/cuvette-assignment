import { Schema, model, Document } from "mongoose";

interface ICompany extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  employeeSize: string
  emailOtp: string;
  phoneOtp: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  jobs: Schema.Types.ObjectId[];
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  companyName: { type: String, required: true, unique: true },
  employeeSize: { type: String, required: true },
  phoneOtp: { type: String },
  emailOtp: { type: String },
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

export default model<ICompany>("Company", companySchema);
