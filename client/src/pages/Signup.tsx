import { AuthForm } from "@/components/authForm";
import { useLocation } from "react-router-dom";

const Signup = () => {
  const signup = useLocation().pathname.split("/")[1];
  console.log(signup);
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md p-4'>
        <div className='text-center mb-6'>
          <h1 className='text-4xl font-bold text-gray-800'>Sign Up</h1>
          <p className='text-lg text-gray-500'>
            Create a new account to get DIVITI NEWS.
          </p>
        </div>

        <AuthForm signup={signup === "signup"} />
      </div>
    </div>
  );
};

export default Signup;
