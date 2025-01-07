import { Router, type Request, type Response, type NextFunction } from "express";
import { User } from "../models/index";
import { errorHandler, successHandler } from "../lib/responseHandler";
import { sendMail } from "../services/mailing";

const router = Router();
router.get("/email", async (req: Request, res: Response, next: NextFunction) => {
	const { userId, url } = req.query;
	try {
		const user = await User.findById(userId);
		if (!user) return errorHandler(res, 404, null, "user Not Found", "NOT_FOUND");
		user.codeExpiry = new Date().getTime() + 600000;
		await sendMail(user.email as string, url as string);
		return successHandler(res, 200, null, "email send");
	} catch (error) {
		next(error);
	}
});

export default router;
