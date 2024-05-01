import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/user/userSlice";
import Oauth from "../components/Oauth";

const backHost = import.meta.env.VITE_HOST;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const formChangeHandler = (e) => {
    setIsError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.email.length === 0) {
      setIsError("Email Field cannot be empty");
      return;
    }

    if (formData.password.length < 8) {
      setIsError("Password too short");
      return;
    }
    try {
      const res = await fetch(`${backHost}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.message);
      }
      dispatch(updateUser(data.data));
      setIsLoading(false);
      navigator("/");
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  };
  return (
    <section className="p-3 mt-28 max-w-[35rem] mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4  bg-green-1 p-7 rounded-md"
      >
        <input
          className="p-2 text-black font-bold"
          type="email"
          placeholder="Email"
          name="email"
          onChange={formChangeHandler}
        />
        <input
          className="p-2 text-black font-bold"
          type="text"
          placeholder="Password"
          name="password"
          onChange={formChangeHandler}
        />
        <button disabled={isLoading} className="bg-black py-2 hover:opacity-85">
          {isLoading ? <Loading /> : "Sign In"}
        </button>
        <Oauth />
        {isError && (
          <p className="ml-2 -mt-2 font-extrabold text-red-700 text-xs sm:text-sm md:text-lg">
            {isError}
          </p>
        )}
      </form>
      <p className="ml-3 text-xs text-white sm:text-sm md:text-lg">
        Don&apos;t have an account{" "}
        <Link className="text-green-500 hover:underline" to="/sign-up">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignIn;
