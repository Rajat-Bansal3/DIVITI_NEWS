import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		likes: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
			},
		],
		comments: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Comment",
			},
		],
		content: {
			type: String,
			required: true,
		},
		yt: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
