import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { sidebarCloseHandler, updateUser } from "../redux/user/userSlice";
import Oauth from "../components/Oauth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formChangeHandler = (e) => {
    setIsError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(sidebarCloseHandler());
  }, []);

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
  const showPassword = () => {
    setPasswordVisible(true);
  };
  const hidePassword = () => {
    setPasswordVisible(false);
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
          type={`${passwordVisible ? "text" : "password"}`}
          placeholder="Password"
          name="password"
          onChange={formChangeHandler}
        />
        <button
          type="button"
          onClick={showPassword}
          className={`self-end relative -top-11 right-2 ${
            passwordVisible ? "hidden" : ""
          }`}
        >
          <FaEye className="text-black text-xl cursor-pointer hover:opacity-85" />
        </button>
        <button
          type="button"
          onClick={hidePassword}
          className={`self-end relative -top-11 right-2 ${
            passwordVisible ? "" : "hidden"
          }`}
        >
          <FaEyeSlash className="text-black text-xl cursor-pointer hover:opacity-85" />
        </button>
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
