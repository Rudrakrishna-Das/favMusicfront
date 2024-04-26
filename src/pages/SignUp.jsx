import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [isError, setIsError] = useState(false);
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
    if (formData.userName.length < 2) {
      setIsError("Username should be more that 2 characters");
      return;
    }

    if (formData.password.length < 8) {
      setIsError("Password should atleast be 8 characters");
      return;
    }

    const res = await fetch("http://127.0.0.1:5000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
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
        <button className="bg-black py-2 hover:opacity-85">Sign In</button>
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
