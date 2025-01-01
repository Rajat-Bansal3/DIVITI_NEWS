import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../lib/responseHandler";
import jwt from "jsonwebtoken";
import { env } from "../env";
export const access = (req: Request, res: Response, next: NextFunction) => {}; //WIP:MAKE IT
