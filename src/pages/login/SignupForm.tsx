import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

type FormValues = {
  userName: string;
  userEmail: string;
  userPassword: string;
};
const cookies = new Cookies();

const SignupForm: React.FC = () => {
  const [isAuth] = useState(cookies.get("auth-token"));
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed up!", user);
        cookies.set("auth-token", user.refreshToken);
        if (auth.currentUser) {

          updateProfile(auth.currentUser, {
            displayName: data.userName,
          }).then(() => {
            console.log(auth)
          }).catch((error) => {
            console.log("Error Occur:", error);
          });
          navigate("/home");
        }
        else {
          console.log('sign in failed')
          alert("sigin failed")
        }
        
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-amber-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-amber-700 mb-4">
          Sign up
        </h1>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-amber-500 font-semibold mb-2">
                Your Name:
              </label>
              <input
                type="text"
                id="userName"
                {...register("userName", { required: true })}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
              />
            </div>
            <div className="mb-4">
              <label className="block text-amber-500 font-semibold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="userEmail"
                {...register("userEmail", { required: true })}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
              />
            </div>
            <div className="mb-4">
              <label className="block text-amber-500 font-semibold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="userPassword"
                {...register("userPassword", { required: true })}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
              />
            </div>
            <div className="text-red-500 hover:text-red-800">
              {errors.userPassword && <p>This is required</p>}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
              >
                Sign up
              </button>
            </div>
            <Link
              to={"/signin"}
              className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
            >
              Already have an account
            </Link>
            <Link
              to={"../"}
              className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
            >
              Back to home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
