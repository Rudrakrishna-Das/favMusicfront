import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux/user/userSlice";
import { useState } from "react";
import Loading from "./Loading";

const backHost = import.meta.env.VITE_HOST;

const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const googleAuthHandler = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    const res = await fetch(`${backHost}/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      }),
      credentials: "include",
    });
    const data = await res.json();
    dispatch(updateUser(data.data));
    setLoading(false);
    navigate("/");
  };
  return (
    <button
      onClick={googleAuthHandler}
      disabled={loading}
      className="bg-red-800 shadow-md py-2 rounded-sm hover:opacity-90"
      type="button"
    >
      {loading ? <Loading /> : "Signin with Google"}
    </button>
  );
};

export default Oauth;
