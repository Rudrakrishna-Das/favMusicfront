import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import app from "../firebase";
import { updateUser } from "../redux/user/userSlice";
import Loading from "../components/Loading";

const backHost = import.meta.env.VITE_HOST;

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fileHandleUpload = (file) => {
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
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          });
        }
      );
    };
    if (file) {
      fileHandleUpload(file);
    }
  }, [file]);

  const formChangeHandler = (e) => {
    setHasError(false);
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const keys = Object.keys(formData);
    if (keys.length === 0) {
      setHasError(true);
      setMessage("Nothing to Update");
      return;
    }
    if (formData.password?.length < 8) {
      setHasError(true);
      setMessage("password must be 8 characters long");
      return;
    }
    const res = await fetch(`${backHost}/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await res.json();
    if (!data.ok) {
      setHasError(true);
      setMessage(data.message);
      return;
    }
    setIsLoading(false);
    dispatch(updateUser(data.data));
    setMessage(data.message);
  };
  const signoutHandler = async () => {
    const res = await fetch(`${backHost}/sign-out`, {
      credentials: "include",
    });
    const data = await res.json();
    if (!data.ok) {
      setHasError(true);
      setMessage(data.message);
    }
    dispatch(updateUser(data.data));
  };

  return (
    <section className=" md:flex md:items-center md:justify-around gap-6 md:flex-row my-16 md:my-20">
      <form
        onSubmit={submitHandler}
        className="flex flex-col flex-grow gap-3 max-md:max-w-[100%] max-w-[70%] mx-auto"
      >
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          type="file"
          accept="images/*"
          disabled={isLoading}
        />

        <img
          onClick={() => fileRef.current.click()}
          className="w-20 h-2w-20 object-contain self-center rounded-full cursor-pointer"
          src={formData.avatar ? formData.avatar : currentUser.avatar}
          alt={currentUser.userName}
        />
        {filePercentage > 0 && (
          <p className="text-center text-white">
            {filePercentage === 100
              ? "Upload completed"
              : `Upload done ${filePercentage} %`}
          </p>
        )}
        {fileUploadError && <p className="">{fileUploadError}</p>}
        <input
          className="w-[70%] mx-auto py-2 px-1 text-black text-base sm:text-lg md:text-xl font-semibold rounded-lg"
          type="text"
          placeholder="Username"
          name="userName"
          onChange={formChangeHandler}
          value={formData.userName ? formData.userName : currentUser.userName}
          disabled={isLoading}
        />
        <input
          className="w-[70%] mx-auto py-2 px-1 text-black text-base sm:text-lg md:text-xl font-semibold rounded-lg"
          type="email"
          placeholder="Email"
          name="email"
          onChange={formChangeHandler}
          value={formData.email ? formData.email : currentUser.email}
          disabled={isLoading}
        />
        <input
          className="w-[70%] mx-auto py-2 px-1 text-black text-base sm:text-lg md:text-xl font-semibold rounded-lg"
          type="text"
          placeholder="Password"
          name="password"
          onChange={formChangeHandler}
          value={formData.password ? formData.password : ""}
          disabled={isLoading}
        />
        <button
          disabled={isLoading}
          className="bg-blue-700 w-[70%] mx-auto py-2 text-sm md:text-lg font-bold rounded-full hover:opacity-85"
        >
          {isLoading ? <Loading /> : "Update User"}
        </button>
        {(hasError || message.length > 0) && (
          <p
            className={`text-sm ${
              hasError ? "text-red-600" : "text-green-600"
            } font-bold mx-auto`}
          >
            {message}
          </p>
        )}
        <button
          type="button"
          onClick={signoutHandler}
          className="bg-red-700 w-[70%] mx-auto py-2 text-sm md:text-lg font-bold rounded-full hover:opacity-85"
        >
          Sign out
        </button>
      </form>
      <div className="flex flex-col flex-grow gap-3 mx-auto max-md:max-w-[100%] max-w-[70%] max-md:mt-5">
        <button
          onClick={() => navigate("/upload-music")}
          type="button"
          className="bg-green-400 w-[70%] mx-auto text-sm md:text-lg py-2 font-bold text-black rounded-full hover:opacity-85"
        >
          Upload your music
        </button>
        <button
          onClick={() => navigate("/personal-music")}
          type="button"
          className="bg-green-400 w-[70%] mx-auto text-sm md:text-lg py-2 font-bold text-black rounded-full hover:opacity-85"
        >
          Your Music
        </button>
      </div>
    </section>
  );
};

export default Profile;
