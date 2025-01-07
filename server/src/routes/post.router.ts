import { Router, type Request, type Response, type NextFunction } from "express";
import { access } from "../middleware/access.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { Post } from "../models/index";
import { errorHandler, successHandler } from "../lib/responseHandler";
import { postSchema } from "../types/Types";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
	const { page = "1", limit = "10" } = req.query as {
		page: string;
		limit: string;
	};
	const start = (Number.parseInt(page) - 1) * Number.parseInt(limit);
	try {
		const posts = await Post.find(
			{},
			{
				author: true,
				comments: true,
				createdAt: true,
				likes: true,
				yt: true,
				title: true,
				description: true,
				tags: true,
			},
		)
			.limit(Number.parseInt(limit))
			.skip(start);
		if (posts && posts.length > 0)
			return successHandler(res, 200, posts, "Posts fetched successfully");
		return successHandler(res, 200, [], "no posts found");
	} catch (error) {
		next(error);
	}
});
router.get("/search", async (req: Request, res: Response, next: NextFunction) => {
	const { query, author, tags, startDate, endDate, page = 1, limit = 10 } = req.query;

	const filter: Record<string, any> = {};

	if (query) {
		const regex = new RegExp(query as string, "i");
		filter.$or = [{ title: regex }, { description: regex }, { content: regex }];
	}

	if (author) {
		filter.author = author;
	}

	if (tags) {
		filter.tags = { $in: (tags as string).split(",") };
	}

	if (startDate || endDate) {
		filter.createdAt = {};
		if (startDate) filter.createdAt.$gte = new Date(startDate as string);
		if (endDate) filter.createdAt.$lte = new Date(endDate as string);
	}

	try {
		const results = await Post.find(filter)
			.skip((Number.parseInt(page as string, 10) - 1) * Number.parseInt(limit as string, 10))
			.limit(Number.parseInt(limit as string, 10))
			.sort({ createdAt: -1 });

		return successHandler(res, 200, results, "Posts Fetched Successfully");
	} catch (error) {
		next(error);
	}
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	try {
		// await new Comment({
		//   author: id,
		//   content: "akjsdn",
		//   postId: "67773043ceaa4af5da05539c",
		// }).save();
		const post = await Post.findById(id).populate({
			path: "comments",
			populate: {
				path: "author",
				select: "email",
			},
			options: {
				sort: { createdAt: -1 },
				limit: 20,
			},
		});
		if (post) return successHandler(res, 200, post, "post fetched successfully");
		return errorHandler(res, 404, [], "post with given id not found", "NOT_FOUND");
	} catch (error) {
		next(error);
	}
});
router.post(
	"/",
	authMiddleware,
	access(["admin", "dev"]),
	async (req: Request, res: Response, next: NextFunction) => {
		const payload = postSchema.safeParse(req.body);
		if (!payload.success)
			return errorHandler(res, 400, null, payload.error.toString(), "BAD_REQUEST");
		const post = payload.data;
		try {
			const _post = await new Post({
				author: req.userId,
				content: post.content,
				description: post.description,
				images: post.images,
				title: post.title,
				yt: post.yt,
				tags: post.tags,
			}).save();
			return successHandler(res, 201, _post._id, "post created successfully");
		} catch (error) {
			next(error);
		}
	},
);
router.delete(
	"/:id",
	authMiddleware,
	access(["admin", "dev"]),
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		try {
			const deleted = await Post.findByIdAndDelete(id, { new: true });
			if (!deleted) return errorHandler(res, 404, null, "Post not Found", "NOT_FOUND");
			return successHandler(res, 204, null, "Post Deleted Successfully");
		} catch (error) {}
	},
);

export default router;
