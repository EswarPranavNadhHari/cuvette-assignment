import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import jobRoutes from "./routes/jobRoutes";
import cors from "cors"
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

dotenv.config();
const app: Application = express();
app.use(cors())

connectDB();


app.use(express.json()); // To parse JSON bodies
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Change '*' to a specific origin in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, PATCH, DELETE, POST, PUT');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
  }

  return await fn(req, res);
};

app.use("/api/auth", allowCors(authRoutes));
app.use("/api/jobs", allowCors(jobRoutes));
app.get("/",(req: Request, res: Response) => {
    res.send("hello world!");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
