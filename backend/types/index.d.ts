import express from "express";

declare global {
  namespace Express {
    export interface Request {
      company?: any;
      companyId? : any;
    }
  }
}
