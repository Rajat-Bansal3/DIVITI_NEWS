import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../lib/responseHandler";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token: string = req.cookies.ACCESS_TOKEN;
		if (!token) return errorHandler(res, 400, null, "NO TOKEN", "BAD_REQUEST");
		const authToken = token.split(" ")[1];
		if (!authToken) return errorHandler(res, 400, null, "NO TOKEN 1", "BAD_REQUEST");
		const payload = jwt.verify(authToken, env.JWT_SECRET) as {
			id: string;
			role: string;
			iat: number;
			exp: number;
		};
		req.userId = payload.id;
		req.role = payload.role;
		next();
	} catch (error) {
		next(error);
	}
};
