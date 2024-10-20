import { Router } from "express";
import { register, verifyMobileOtp, verifyEmailOtp, generateToken } from "../controllers/authController";

const router: Router = Router();

router.post("/register", register);
// router.post("/login", login);
router.post("/verify/phone", verifyMobileOtp);
router.post("/verify/email", verifyEmailOtp);
router.post("/verify/email", verifyEmailOtp);
router.get("/isverified", generateToken);

export default router;
