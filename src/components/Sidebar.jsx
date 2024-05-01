import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ openSideBar }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section
      className={`${
        openSideBar ? "flex" : "hidden"
      } h-screen bg-green-400 max-w-44 justify-center pt-20 fixed top-0 left-0 z-10 transition-all`}
    >
      <nav className="flex flex-col items-center gap-16 text-xl px-10 font-semibold text-black">
        <Link to="/profile">
          {currentUser ? (
            <img className="rounded-full w-20 h-20" src={currentUser.avatar} />
          ) : (
            <p>Sign In</p>
          )}
        </Link>
        <div className="flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
