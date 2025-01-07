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
		author: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		postId: {
			type: mongoose.Types.ObjectId,
			ref: "Post",
		},
	},
	{ timestamps: true },
);
commentSchema.pre("findOneAndDelete", async function (next) {
	try {
		const commentId = this.getQuery()["_id"];
		await Comment.findOneAndDelete(commentId);
		next();
	} catch (error: any) {
		next(error);
	}
});
export const Comment = mongoose.model("Comment", commentSchema);
