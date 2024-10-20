"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");
    token = token?.split(" ")[1];
    if (!token) {
        res.status(401).send("Access Denied");
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.company = verified;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid Token");
    }
};
exports.default = authMiddleware;
