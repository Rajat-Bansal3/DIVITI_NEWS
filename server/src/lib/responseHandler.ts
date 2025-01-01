import type { Response } from "express";
import type { ERROR } from "../types/errorTypes";
export const errorHandler = (
	res: Response,
	status: number,
	data: any,
	message: string,
	error: ERROR,
) => {
	res.status(status).json({ success: false, data, message, error });
};
export const successHandler = (res: Response, status: number, data: any, message: string) => {
	res.status(status).json({ success: true, data, message });
};
