import "./App.css";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calendarActions } from "./store/calendarSlice";

import Main from "./pages/mainPage/Main";
import Register from "./components/auth/register/Register";
import Calendar from "./components/appointment/Calendar";
import LoginPage from "./pages/loginPage/LoginPage";
import AboutMe from "./pages/aboutMe/AboutMe";
import Portfolio from "./pages/portfolio/Portfolio";
import Kontakt from "./pages/contactUs/Kontakt";
import Profile from "./pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    fetch(
      "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json"
    )
      .then((resp) => resp.json())
      .then((data) => {
        const fetchedMeetings = [];
        for (const key in data) {
          fetchedMeetings.push(data[key]);
        }
        dispatch(calendarActions.fetchMeetings(fetchedMeetings));
      });
  }, []);
  // const userName = useSelector((state) => state.user.user[0].name);
  // console.log(userName);
  return (
    <div>
      <Switch>
        <Route component={AboutMe} path="/about" exact />
        <Route component={Portfolio} path="/portfolio" exact />
        <Route component={Kontakt} path="/kontakt" exact />
        <Route component={LoginPage} path="/login" exact />
        <Route component={Register} path="/register" exact />
        <Route component={Calendar} path="/calendar" exact />
        <Route component={Profile} path="/profile" exact />
        <Route path="*">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
