import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		parentId: {
			type: mongoose.Types.ObjectId,
			ref: "Comment",
		},
		children: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Comment",
			},
		],
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);
export const Comment = mongoose.model("Comment", commentSchema);
