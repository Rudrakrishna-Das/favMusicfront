import { useEffect, useState } from "react";
import Loading from "./Loading";
const backHost = import.meta.env.VITE_HOST;

const Music = ({ address, protect }) => {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMusicHandler = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`${backHost}/${address}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!data.ok) {
          throw new Error(data.message);
        }
        setMusics(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMusicHandler();
  }, [address]);
  const deleteMusicHandler = async (name) => {
    setDeleteLoading({ [name]: true });

    const res = await fetch(`${backHost}/delete-music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicName: name }),
      credentials: "include",
    });
    const data = await res.json();
    if (data.ok) {
      setDeleteLoading({ [name]: false });
      setMusics(data.data);
    }
  };

  return (
    <ul className="my-8 mx-2">
      {loading && <Loading />}
      {error && <p className="text-xl text-center text-red-500">{error}</p>}
      {!loading && !error && musics.length === 0 && (
        <p className="text-4xl">You Have no Music</p>
      )}
      {musics.length > 0 &&
        musics.map((music) => (
          <div key={music.title} className="flex flex-col">
            <li className="flex flex-col gap-3 pb-2 mt-10 mb-2 items-center rounded-3xl bg-green-1">
              <audio className=" w-[100%]" controls src={music.music} />
              <div className="flex gap-10 max-sm:mx-10 max-sm:text-base text-black font-bold text-xl">
                <h1>Title:- {music.title}</h1>
                <h1 className="max-sm:hidden">Album:- {music.album}</h1>
                <h1 className="max-sm:hidden">Artist:- {music.artist}</h1>
              </div>
              {protect && (
                <button
                  disabled={deleteLoading[music.title]}
                  onClick={() => deleteMusicHandler(music.title)}
                  className="bg-red-600 self-end mr-5 px-9 py-1 rounded-lg text-black font-bold text-xl max-sm:text-base cursor-pointer hover:opacity-80 disabled:bg-slate-600"
                >
                  {deleteLoading[music.title] ? <Loading /> : "Delete"}
                </button>
              )}
            </li>
            {!protect && (
              <p className="self-end mx-6">
                Uploaded by{" "}
                {music.users.length === 1
                  ? music.users[0]
                  : music.users.length === 2
                  ? `${music.users[0]} & ${music.users[1]}`
                  : `${music.users[0]},${music.users[1]} & ${
                      music.users.length - 2
                    } ${music.users.length - 2 === 1 ? "other" : "others"}`}
              </p>
            )}
          </div>
        ))}
    </ul>
  );
};
export default Music;
