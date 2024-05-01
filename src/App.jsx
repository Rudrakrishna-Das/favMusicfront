import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

const App = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const openSideBarOpenHandler = () => {
    setIsSideBarOpen((prevState) => !prevState);
  };
  return (
    <BrowserRouter>
      <header>
        <Navigation openSideBar={openSideBarOpenHandler} />
        <Sidebar openSideBar={isSideBarOpen} />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
