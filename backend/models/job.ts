import { Schema, model, Document } from "mongoose";

interface IJob extends Document {
  title: string;
  description: string;
  experienceLevel: string;
  candidates: string[];
  endDate: Date;
  postedBy: Schema.Types.ObjectId;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  candidates: [{ type: String, required: true }],
  endDate: { type: Date, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: "Company" },
});

export default model<IJob>("Job", jobSchema);
export { IJob };
