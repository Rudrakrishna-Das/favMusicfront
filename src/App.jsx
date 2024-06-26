import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import UploadMusic from "./pages/UploadMusic";
import PersonalMusic from "./pages/PersonalMusic";
import { useDispatch, useSelector } from "react-redux";
import {
  sidebarCloseHandler,
  sidebarOpenHandler,
} from "./redux/user/userSlice";

const App = () => {
  const { sidebarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <header>
        <Navigation
          openSideBar={() =>
            sidebarOpen
              ? dispatch(sidebarCloseHandler())
              : dispatch(sidebarOpenHandler())
          }
        />
        <Sidebar openSideBar={sidebarOpen} />
      </header>
      <main onClick={() => dispatch(sidebarCloseHandler())}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload-music" element={<UploadMusic />} />
            <Route path="/personal-music" element={<PersonalMusic />} />
          </Route>
        </Routes>
        <footer className="bg-green-400 fixed bottom-0 w-full">
          <h1 className="text-black text-center font-bold">
            &#169; Designed and Developed by{" "}
            <a
              className="hover:underline"
              href="https://rudra-portfolio.vercel.app/"
              target="_blank"
            >
              Rudra Krishna Das
            </a>
          </h1>
        </footer>
      </main>
    </BrowserRouter>
  );
};

export default App;
