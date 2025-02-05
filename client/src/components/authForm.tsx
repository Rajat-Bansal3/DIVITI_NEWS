import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useLogin, useRegister } from "@/api/auth_api";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

interface AuthProps {
  signup: boolean;
}

export function AuthForm({ signup }: AuthProps) {
  const {
    error: registerError,
    isError: isRegisterError,
    isLoading: isRegisterLoading,
    register,
  } = useRegister();

  const {
    error: loginError,
    isError: isLoginError,
    isLoading: isLoginLoading,
    signin,
  } = useLogin();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (signup) {
      await register(data);
    } else {
      await signin({ email: data.email, password: data.password });
    }
    form.reset();
  }

  const isLoading = signup ? isRegisterLoading : isLoginLoading;
  const isError = signup ? isRegisterError : isLoginError;
  const error = signup ? registerError : loginError;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-sm mx-auto space-y-6 p-6 bg-white rounded-lg shadow-lg'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your email'
                  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your email will be used for login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your password should be at least 6 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading
            ? signup
              ? "Registering..."
              : "Signing in..."
            : signup
            ? "Register"
            : "Sign In"}
        </Button>

        {signup ? (
          <span className='text-sm text-gray-600'>
            Already have an account?{" "}
            <Link
              to='/signin'
              className='text-blue-500 hover:text-blue-700 font-medium'
            >
              LOGIN NOW!
            </Link>
          </span>
        ) : (
          <span className='text-sm text-gray-600'>
            Don&apos;t have an account?{" "}
            <Link
              to='/signup'
              className='text-blue-500 hover:text-blue-700 font-medium'
            >
              SIGN UP NOW!
            </Link>
          </span>
        )}

        {isError && error && (
          <div className='text-red-500 mt-4 text-center'>{error.message}</div>
        )}
      </form>
    </Form>
  );
}
