/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/env";
import { Post, tags } from "@/types/post";
import { toast } from "sonner";

type ApiError = {
  message: string;
};

const handleApiError = (error: any) => {
  console.error(error);
  if (error instanceof Error) {
    toast.error(
      error.message + +"\tretrying..." || "An unexpected error occurred"
    );
  } else if (error instanceof Response) {
    error.json().then((errorData: ApiError) => {
      toast.error(errorData.message + "\tretrying..." || "API error occurred");
    });
  } else {
    toast.error("An unknown error occurred");
  }
};

const apiRequest = async <T>(
  url: string,
  method: string,
  body?: object
): Promise<T> => {
  const requestBody = body ? JSON.stringify(body) : undefined;

  try {
    const response = await fetch(`${base_url}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      handleApiError(errorData);
      throw new Error(errorData.message || "Something went wrong");
    }

    const data: T = await response.json();
    return data;
  } catch (error: any) {
    handleApiError(error);
    throw new Error(error.message || "Failed to make API request");
  }
};
export const search = async (search: string, tags: tags) => {
  console.log("in it");
  const data = await apiRequest<{
    success: boolean;
    status: string;
    data: Array<Post>;
    message: string;
  }>(`/post/search?query=${search}&&tags=${tags.join(",")}`, "GET");
  console.log(data);
  return data;
};
{
  /*
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
    */
}
