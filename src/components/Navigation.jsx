import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = ({ openSideBar }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <nav className="bg-green-400 flex justify-between w-full items-center p-4 font-extrabold text-black relative z-50">
      <Link to="/">
        <h1 className="cursor-pointer z-50">FavMp3</h1>
      </Link>
      <ul className="md:flex items-center gap-4 hidden ">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full w-8 h-8" src={currentUser.avatar} />
            ) : (
              <p>Sign In</p>
            )}
          </Link>
        }
      </ul>
      <img
        onClick={openSideBar}
        className="invert block md:hidden"
        src="../../icons/hamburger.svg"
      />
    </nav>
  );
};

export default Navigation;
