import { useEffect } from "react";
import Music from "../components/Musics";
import { useDispatch } from "react-redux";
import { sidebarCloseHandler } from "../redux/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sidebarCloseHandler());
  }, []);
  return (
    <section className="max-w-[45rem] mx-auto">
      <h1 className="text-4xl max-md:text-2xl text-center">
        Musics you love to listen
      </h1>
      {<Music address={"all-music"} protect={false} />}
    </section>
  );
};

export default Home;
