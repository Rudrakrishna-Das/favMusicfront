import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import app from "../firebase";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const backHost = import.meta.env.VITE_HOST;

const UploadMusic = () => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [filePercentage, setFilePercentage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fileUploadHandler = (file) => {
      setLoading(true);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
        },
        () => {
          setError(true);
          setMessage("SomeThing went wrong!");
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, music: downloadURL });
            setLoading(false);
          });
        }
      );
    };
    if (file) {
      fileUploadHandler(file);
    }
  }, [file]);

  const formChangeHandler = (e) => {
    setError(false);
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !formData.title ||
      !formData.artist ||
      !formData.album ||
      !formData.music ||
      formData.title.trim().length === 0 ||
      formData.artist.trim().length === 0 ||
      formData.album.trim().length === 0 ||
      formData.music.trim().length === 0
    ) {
      setError(true);
      setMessage("Please fill all field and upload a music");
      return;
    }
    const res = await fetch(`${backHost}/upload-music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.ok) {
      setError(true);
      setMessage(data.message);
    }
    setLoading(false);
    navigate("/personal-music");
  };

  return (
    <section className="w-full sm:mx-auto my-8 h-[30rem] sm:max-w-[45rem]  bg-green-1 p-4">
      <h1 className="text-center text-base sm:text-xl font-bold">
        Uplaod your music here
      </h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 max-w-[30rem] mx-auto my-20"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="audio/*"
          className="cursor-pointer"
        />
        {filePercentage > 0 && (
          <p className="text-sm font-semibold">{`${
            filePercentage === 100 ? "Uploded" : "Uploading"
          } ${filePercentage}%`}</p>
        )}
        <input
          className="py-1 px-2 text-base font-semibold sm:text-xl bg-transparent border-2 border-black focus-visible:outline-none"
          type="text"
          placeholder="Title"
          name="title"
          onChange={formChangeHandler}
          disabled={loading}
        />
        <input
          className="py-1 px-2 text-base font-semibold sm:text-xl bg-transparent border-2 border-black focus-visible:outline-none"
          type="text"
          placeholder="Artist"
          name="artist"
          onChange={formChangeHandler}
          disabled={loading}
        />
        <input
          className="py-1 px-2 text-base font-semibold sm:text-xl bg-transparent border-2 border-black focus-visible:outline-none"
          type="text"
          placeholder="Album"
          name="album"
          onChange={formChangeHandler}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="bg-black py-2 text-lg rounded-md hover:opacity-95 disabled:cursor-not-allowed disabled:bg-slate-600"
        >
          {loading ? <Loading /> : "Submit"}
        </button>
        {message.length > 0 && (
          <p
            className={`${
              error ? "text-red-600" : "text-green-600"
            } font-bold text-sm sm:text-lg`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
};

export default UploadMusic;
