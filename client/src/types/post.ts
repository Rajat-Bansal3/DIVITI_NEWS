import z from "zod";

export type Post = z.infer<typeof postSchema>;
export type Comment = z.infer<typeof commentSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commentSchema: z.ZodType<any, any, any> = z.lazy(() =>
  z.object({
    _id: z.string(),
    author: z.string(),
    content: z.string(),
    createdAt: z.string(),
    children: z.array(commentSchema),
  })
);
export const tagsSchema = z.array(
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
  ])
);
export const postSchema = z.object({
  _id: z.string(),

  title: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title cannot exceed 100 characters."),
  description: z
    .string()
    .min(10, "Description is required.")
    .max(200, "Description cannot exceed 100 characters."),
  content: z
    .string()
    .min(20, "Content is required.")
    .max(10000, "Content cannot exceed 100 characters."),
  yt: z.string().url().optional(),
  images: z.array(z.string().url()),
  tags: tagsSchema.optional(),
  createdAt: z.string(),
  author: z.object({
    email: z.string(),
    _id: z.string(),
  }),
  likes: z.array(
    z.object({
      _id: z.string(),
    })
  ),
  comments: z.array(commentSchema),
});

export type tags = z.infer<typeof tagsSchema>;
