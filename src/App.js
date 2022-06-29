import "./App.css";

import { Route, Routes} from "react-router-dom";
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

function App() {
  //new single event
  const event = useSelector((state) => state.calendar.meeting);
  

  //sending event to firebase
  useEffect(() => {
    fetch(
      "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json",
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-type": "application / json",
        },
      }
    );
  }, [event]);

  //fetching events from firebase
  // useEffect(() => {
  //   fetch(
  //     "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json"
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const fetchedMeetings = [];
  //       for (const key in data) {
  //         fetchedMeetings.push(data[key]);
  //       }
  //       dispatch(calendarActions.fetchMeetings(fetchedMeetings));
  //     });
  // }, []);
  // const userName = useSelector((state) => state.user.user[0].name);
  // console.log(userName);
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
