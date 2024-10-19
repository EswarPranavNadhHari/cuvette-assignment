import { ObjectId } from "mongoose";

export interface JwtPayload {
    id?: ObjectId;
}