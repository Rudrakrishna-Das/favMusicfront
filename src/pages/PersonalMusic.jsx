import { useSelector } from "react-redux";
import Music from "../components/Musics";

const PersonalMusic = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="max-w-[45rem] mx-auto my-3 p-2 text-center">
      <h1 className="text-base sm:text-lg md:text-2xl">
        {`${
          currentUser.userName[0].toUpperCase() +
          currentUser.userName.slice(1).toLowerCase()
        }`}
        &apos;s Musics
      </h1>
      <Music address={"personal-music"} protect={true} />
    </section>
  );
};

export default PersonalMusic;
