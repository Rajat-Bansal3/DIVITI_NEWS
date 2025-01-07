import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role: {
			type: String,
			enum: ["admin", "user", "dev"],
			required: true,
			defualt: "user",
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
		verificationCode: {
			type: String,
			required: true,
		},
		codeExpiry: {
			type: Number,
			required: true,
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true },
);
export const User = mongoose.model("User", userSchema);
