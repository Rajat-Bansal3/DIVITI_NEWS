import type { Request, Response, NextFunction } from "express";
import { errorHandler } from "../lib/responseHandler";
import type { Role } from "../types/Types";

export const access = (role: Role[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (role.includes(req.role as Role)) {
			return next();
		}
		return errorHandler(
			res,
			403,
			null,
			"You are not permitted to perform this action",
			"FORBIDDEN",
		);
	};
};
