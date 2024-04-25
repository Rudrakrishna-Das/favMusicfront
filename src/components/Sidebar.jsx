import { Link } from "react-router-dom";

const Sidebar = ({ openSideBar }) => {
  return (
    <section
      className={`${
        openSideBar ? "flex" : "hidden"
      } h-screen bg-green-400 max-w-44 justify-center pt-20 fixed top-0 left-0 z-10 transition-all`}
    >
      <nav className="flex flex-col gap-6 text-xl py-5 px-10">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/sign-in">Sign In</Link>
      </nav>
    </section>
  );
};

export default Sidebar;
