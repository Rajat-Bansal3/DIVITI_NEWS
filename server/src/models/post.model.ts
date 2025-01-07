import mongoose from "mongoose";
import { Comment } from "./comment.model";

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
		tags: [{ type: String }],
		yt: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		title: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true },
);

postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });
postSchema.index({ tags: 1 }, { sparse: true });
postSchema.index({ title: "text", description: "text", content: "text" });
postSchema.index({ tags: 1, createdAt: -1 });

postSchema.pre("findOneAndDelete", async function (next) {
	try {
		const postId = this.getQuery()["_id"];

		if (postId) {
			await Comment.deleteMany({ postId });
		}

		next();
	} catch (error: any) {
		next(error);
	}
});

export const Post = mongoose.model("Post", postSchema);
