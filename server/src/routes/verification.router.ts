import { Router, type Request, type Response, type NextFunction } from "express";
import { User } from "../models/index";
import { errorHandler, successHandler } from "../lib/responseHandler";
import { sendPasswordResetMail } from "../services/mailing";
import { randomPassword } from "../lib/utilFunctions";

const router = Router();

router.get("/email", async (req: Request, res: Response, next: NextFunction) => {
	const { code, userId } = req.query;
	try {
		const user = await User.findById(userId);
		if (!user) return errorHandler(res, 404, null, "user not found", "NOT_FOUND");
		if (Number(user.codeExpiry) < Date.now() || user.verificationCode !== code)
			return errorHandler(res, 400, null, "Code Expired or wrong", "BAD_REQUEST");

		user.verified = true;
		// const pass = randomPassword();
		// await sendPasswordResetMail(user.email as string, pass);
		// user.password = pass;
		user.codeExpiry = new Date(0).getTime();
		await user.save();
		return successHandler(res, 200, null, "User Verified Successfully");
	} catch (error) {
		next(error);
	}
});

export default router;
