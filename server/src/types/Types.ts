import z from "zod";
const sanitizeInput = (input: string): string => {
	const htmlSanitised = input.replace(/<[^>]*>/g, "");
	return htmlSanitised;
};

const roleSchema = z.enum(["admin", "dev", "user"]);
export const postSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required.")
		.max(100, "Title cannot exceed 100 characters.")
		.refine((title) => title === sanitizeInput(title), {
			message: "Title contains unsafe characters.",
		}),
	description: z
		.string()
		.min(10, "Description is required.")
		.max(200, "Description cannot exceed 100 characters.")
		.refine((description) => description === sanitizeInput(description), {
			message: "Description contains unsafe characters.",
		}),
	content: z
		.string()
		.min(20, "Content is required.")
		.max(10000, "Content cannot exceed 100 characters.")
		.refine((content) => content === sanitizeInput(content), {
			message: "Content contains unsafe characters.",
		}),
	yt: z.string().url().optional(),
	images: z.array(z.string().url()),
	tags: z
		.array(
			z.enum([
				"Politics",
				"Business",
				"Technology",
				"Health",
				"Sports",
				"Entertainment",
				"Science",
				"Environment",
				"World",
				"Local",
				"Education",
				"Crime",
				"Travel",
				"Opinion",
				"Lifestyle",
			]),
		)
		.optional(),
});

//types
export type Post = z.infer<typeof postSchema>;
export type Role = z.infer<typeof roleSchema>;
