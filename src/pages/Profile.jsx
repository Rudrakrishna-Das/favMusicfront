import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import app from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const fileRef = useRef(null);

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
        (error) => {
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

  return (
    <section className=" max-w-[32rem] mx-auto my-20">
      <form className="flex flex-col text-black gap-6">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          type="file"
          accept="images/*"
        />
        <div></div>
        <img
          onClick={() => fileRef.current.click()}
          className="mx-auto rounded-full w-14 h-14 cursor-pointer"
          src={currentUser.avatar}
          alt={currentUser.userName}
        />
        {filePercentage > 0 && (
          <p className="text-center text-white">
            {filePercentage === 100
              ? "Upload completed"
              : `Upload done ${filePercentage} %`}
          </p>
        )}
        {fileUploadError && (
          <p className="text-red-600 text-center">{fileUploadError}</p>
        )}
        <input
          className="py-2 px-1 font-bold text-xl"
          type="text"
          placeholder="Username"
          value={currentUser.userName}
        />
        <input
          className="py-2 px-1 font-bold text-xl"
          type="email"
          placeholder="Email"
          value={currentUser.email}
        />
        <input
          className="py-2 px-1 font-bold text-xl"
          type="text"
          placeholder="Password"
        />
        <button className="bg-blue-700 py-2 text-lg font-bold hover:opacity-90 md:text-xl">
          Update user
        </button>
        <button
          onClick={() => navigate("/upload-music")}
          type="button"
          className="bg-green-400 py-2 text-lg font-bold hover:opacity-90 md:text-xl"
        >
          Select your music
        </button>
      </form>
      <div className="flex justify-between text-white">
        <p className="text-red-500 hover:underline cursor-pointer">
          Delete account
        </p>
        <p className="hover:underline cursor-pointer">Sign out</p>
      </div>
    </section>
  );
};

export default Profile;
