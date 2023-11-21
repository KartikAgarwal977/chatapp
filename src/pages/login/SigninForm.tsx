import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

type FormValues = {
  email: string;
  password: string;
};
const cookies = new Cookies();

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        cookies.set("auth-token", user.refreshToken);

        navigate('/home')
        console.log(user)
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Email:
          </label>
          <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber">
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Password:
          </label>
          <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber">
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
            />
          </div>
        </div>
        {errors.password && <p>This is required</p>}
        <div>
          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
          >
            Sign in
          </button>
        </div>
        <Link
              to={"/signup"}
              className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
            >
              Not have an account?
            </Link>
            <Link
              to={"../"}
              className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
            >
              Back to home
            </Link>
      </form>
    </div>
  );
};

export default SigninForm;