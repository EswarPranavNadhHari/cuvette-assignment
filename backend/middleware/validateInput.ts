import { Request, Response, NextFunction } from "express";
import { jobPostSchema } from "../utils/validation.js";

const validateJobInput = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = jobPostSchema.safeParse(req.body);

  if (error) {
    res.status(400).json({ error: "Incorrect input" });
    return;
  }

  next();
};

export default validateJobInput;
