import { type NextFunction, type Request, type Response, Router } from "express";
import { authMiddleware, access } from "../middleware/index";
import { User } from "../models/index";
import { errorHandler, successHandler } from "../lib/responseHandler";

const router = Router();

router.get(
	"/",
	authMiddleware,
	access(["admin", "dev", "user"]),
	async (req: Request, res: Response, next: NextFunction) => {
		const id = req.userId;
		try {
			const user = await User.findById(id);
			if (!user) return errorHandler(res, 404, null, "user not found", "FORBIDDEN");
			return successHandler(res, 200, user, "User Fetched Successfully");
		} catch (error) {
			next(error);
		}
	},
);

export default router;
