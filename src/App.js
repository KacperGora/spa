import "./App.css";

import { Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Appointment from "./pages/AppointmentPage";
import AppointmentPage from "./pages/AppointmentPage";
import Register from "./components/appointment/Register";
import Calendar from "./components/appointment/Calendar";
import LoginPage from "./pages/LoginPage";
import AboutMe from "./pages/AboutMe";
import Portfolio from "./pages/Portfolio";
import Kontakt from "./pages/Kontakt";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { calendarActions } from "./store/calendarSlice";

function App() {
  const event = useSelector((state) => state.calendar.meeting);
  let events = useSelector((state) => state.calendar.meetings);
  const [fetchedItems, setFetchedMeetings] = useState([]);

  const dispatch = useDispatch();
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
    ).then((resp) => console.log(resp));
  }, [event]);
  
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

  return (
    <div>
      <Switch>
        <Route path="/about" exact>
          <AboutMe />
        </Route>
        <Route path="/portfolio" exact>
          <Portfolio />
        </Route>
        <Route path="/kontakt" exact>
          <Kontakt />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/appointment" exact>
          <AppointmentPage />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="*">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
