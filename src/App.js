import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Main from "./pages/mainPage/Main";
import Register from "./components/auth/register/Register";
import Calendar from "./components/appointment/Calendar";
import LoginPage from "./pages/loginPage/LoginPage";
import AboutMe from "./pages/aboutMe/AboutMe";
import Portfolio from "./pages/portfolio/Portfolio";
import Kontakt from "./pages/contactUs/Kontakt";
import Profile from "./pages/Profile/Profile";
import FetchEvent from "./components/fetchEvent";
import fetchFn from "./components/fetch";

function App() {
  //new single event
  const event = useSelector((state) => state.calendar.meeting);
  //sending event to firebase
   const url =
     "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json";
  useEffect(() => {
      fetchFn(url, 'POST', {...event})
  }, [event]);

  return (
    <div>
      <FetchEvent />
      <Routes>
        <Route element={<AboutMe />} path="/about" />
        <Route element={<Portfolio />} path="/portfolio" />
        <Route element={<Kontakt />} path="/kontakt" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Calendar />} path="/calendar" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<Main />} path="/"></Route>
      </Routes>
    </div>
  );
}

export default App;
