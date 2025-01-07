import { type Request, Router, type Response, type NextFunction } from "express";
import { User } from "../models/index";
import { errorHandler, successHandler } from "../lib/responseHandler";
import { hashSync, compareSync } from "bcrypt";
import { env } from "../env";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/auth.middleware";
import { randomPassword } from "../lib/utilFunctions";
import { sendMail } from "../services/mailing";
const router = Router();
router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
	const { email, password, role } = req.body;
	try {
		const existingUser = await User.findOne({
			email,
		});
		if (existingUser) return errorHandler(res, 409, null, "user already exists", "CONFLICT");
		const hashedPass = hashSync(password, env.SALT);
		const verificationCode = randomPassword();
		const user = await new User({
			email,
			password: hashedPass,
			role,
			verificationCode,
			codeExpiry: Date.now() + 600000,
		}).save();
		//   const { _user, password: pass } = user;
		const url = `${env.BACKEND_URL}/verification/email?userId=${user._id}&&code=${verificationCode}`;
		await sendMail(user.email as string, url);
		return successHandler(res, 201, user, "User Created Successfully");
	} catch (error) {
		next(error);
	}
});
router.post("/signin", async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return errorHandler(res, 401, null, "Invalid Credentials", "UNAUTHENTICATED");
		const validPass = compareSync(password, existingUser.password as string);
		if (!validPass) return errorHandler(res, 401, null, "Invalid Credentials", "UNAUTHENTICATED");
		const payload = { id: existingUser._id, role: existingUser.role };
		const token = jwt.sign(payload, env.JWT_SECRET, {
			algorithm: "HS512",
			expiresIn: "3d",
		});
		res.cookie("ACCESS_TOKEN", `Bearer ${token}`);
		return successHandler(res, 200, existingUser, "User logged in Successfully");
	} catch (error) {
		next(error);
	}
});

export default router;
