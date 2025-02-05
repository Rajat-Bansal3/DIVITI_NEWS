/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/env";
import { Post } from "@/types/post";
import { useMutation } from "@tanstack/react-query";
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

export const fetchPosts = async () => {
  const data = await apiRequest<{
    success: boolean;
    status: string;
    data: Array<Post>;
    message: string;
  }>("/post", "GET");
  return data;
};

export const useFetchPosts = () => {
  const mutation = useMutation({
    mutationFn: fetchPost,
  });
  return {
    fetchPost: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
export const fetchPost = async (id: string) => {
  const data = await apiRequest<{
    success: boolean;
    status: string;
    data: Post;
    message: string;
  }>(`/post/${id}`, "GET");
  return data;
};
