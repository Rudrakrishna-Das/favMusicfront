import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Oauth from "../components/Oauth";

const backHost = import.meta.env.VITE_HOST;
const SignUp = () => {
  const navigator = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const formChangeHandler = (e) => {
    setIsError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.userName.length < 2) {
      setIsError("Username should be more that 2 characters");
      return;
    }
    if (formData.email.length === 0) {
      setIsError("Email Field cannot be empty");
      return;
    }

    if (formData.password.length < 8) {
      setIsError("Password should atleast be 8 characters");
      return;
    }
    try {
      const res = await fetch(`${backHost}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.ok) {
        setIsLoading(false);
        throw new Error(data.message);
      }
      setIsLoading(false);
      navigator("/sign-in");
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  };
  return (
    <section className="p-3 mt-28 max-w-[35rem] mx-auto">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4   bg-green-1 p-7 rounded-md"
      >
        <input
          className="p-2 text-black font-bold"
          type="text"
          placeholder="Username"
          name="userName"
          onChange={formChangeHandler}
        />
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
        <button
          disabled={isLoading}
          className="bg-black py-2 text-center hover:opacity-85"
        >
          {isLoading ? <Loading /> : "Sign Up"}
        </button>
        <Oauth />
        {isError && (
          <p className="ml-2 -mt-2 font-extrabold text-red-700 text-xs sm:text-sm md:text-lg">
            {isError}
          </p>
        )}
      </form>
      <p className="ml-3 text-xs text-white sm:text-sm md:text-lg">
        Already have an account{" "}
        <Link className="text-green-500 hover:underline" to="/sign-in">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
