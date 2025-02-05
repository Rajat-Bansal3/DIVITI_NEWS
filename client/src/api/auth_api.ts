/* eslint-disable @typescript-eslint/no-explicit-any */
import { base_url } from "@/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type RegisterUser = {
  email: string;
  password: string;
  role?: string;
};

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

export const useRegister = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const registerUser = async (user: RegisterUser) => {
    user.role = user.role ?? "user";
    const data = await apiRequest<{
      success: boolean;
      status: string;
      data: object;
      message: string;
    }>("/auth/signup", "POST", user);
    toast.success(
      "check your email to verify so you can continue without any interruption."
    );
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data);
      nav("/");
    },
  });

  return {
    register: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const signinUser = async (user: RegisterUser) => {
    user.role = user.role ?? "user";
    const data = await apiRequest<{
      success: boolean;
      status: string;
      data: object;
      message: string;
    }>("/auth/signin", "POST", { email: user.email, password: user.password });
    localStorage.setItem("user", JSON.stringify(data.data));
    return data;
  };

  const mutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data);
      nav("/");
    },
  });

  return {
    signin: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
export const fetchUser = () => {};
