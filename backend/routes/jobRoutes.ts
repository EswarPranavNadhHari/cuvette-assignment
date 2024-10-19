import { Router } from "express";
import { postJob, getAllJobs } from "../controllers/jobController";
import authMiddleware from "../middleware/authMiddleware";
import validateJobInput from "../middleware/validateInput";

const router: Router = Router();

router.post("/post", authMiddleware, validateJobInput, postJob); 
router.get("/all", getAllJobs); // Public route to get all jobs

export default router;
