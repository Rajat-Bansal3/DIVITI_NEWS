import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["admin", "user", "dev"],
			required: true,
			defualt: "User",
		},
		password: {
			type: String,
			required: true,
		},
		posts: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Post",
			},
		],
		liked: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Post",
			},
		],
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Comment",
			},
		],
	},
	{ timestamps: true },
);
export const User = mongoose.model("User", userSchema);
