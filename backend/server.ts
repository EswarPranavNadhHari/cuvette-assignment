import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import cors from "cors"

dotenv.config();
const app: Application = express();
app.use(cors())

connectDB();

app.use(cors())
app.use(express.json()); // To parse JSON bodies
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.get("/",(req: Request, res: Response) => {
    res.send("hello");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
