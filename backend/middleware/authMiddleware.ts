import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.header("Authorization");
  token = token?.split(" ")[1]
  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.company = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

export default authMiddleware;
