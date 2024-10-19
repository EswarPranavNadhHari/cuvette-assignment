import { z } from "zod";

// Zod schema for validating job post data
export const jobPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  experienceLevel: z.enum(["junior", "mid", "senior"], {
    errorMap: () => ({ message: "Experience level must be one of 'junior', 'mid', or 'senior'" }),
  }),
  candidates: z.array(z.string().email("Each candidate must have a valid email")),
  endDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "End date must be in the future",
  }),
});
