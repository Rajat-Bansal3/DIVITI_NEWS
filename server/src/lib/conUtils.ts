import mongoose from "mongoose";
import { env } from "../env";

export const connect = async () => {
	try {
		const uri = env.MONGO_URI;
		await mongoose.connect(uri);
		console.log("connected to mongoDB");
	} catch (error) {
		console.log(error);
		throw new Error("Error Connecting to MongoDB");
	}
};
