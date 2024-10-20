import { Request, Response } from "express";
import Job from "../models/job";
import { sendJobAlertEmails } from "../utils/email";

export const postJob = async (req: Request, res: Response): Promise<void> => {
  const { title, description, experienceLevel, candidates, endDate } = req.body;
  
  try {
    const newJob = await Job.create({
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
      postedBy: req.company.id,
    });
    
    await sendJobAlertEmails(candidates, newJob);

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(400).json({ error: "Error posting the job" });
  }
};

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs" });
  }
};
