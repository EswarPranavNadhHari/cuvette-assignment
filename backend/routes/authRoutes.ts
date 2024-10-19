import { Router } from "express";
import { register, verifyMobileOtp, verifyEmailOtp } from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", register);
// router.post("/login", login);
router.post("/verify/phone", authMiddleware ,verifyMobileOtp);
router.post("/verify/email", authMiddleware ,verifyEmailOtp);

export default router;
