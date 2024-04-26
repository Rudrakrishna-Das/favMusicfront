import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="p-3 mt-28 max-w-[35rem] mx-auto">
      <form className="flex flex-col gap-4   bg-green-1 p-7 rounded-md">
        <input
          className="p-2 text-black font-bold"
          type="email"
          placeholder="Email"
        />
        <input
          className="p-2 text-black font-bold"
          type="text"
          placeholder="Password"
        />
        <button className="bg-black py-2 hover:opacity-85">Sign In</button>
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
